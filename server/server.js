// Server stuff
const io = require("socket.io")(5001, {
  cors: {
    origin: "*",
  },
});
const mqtt = require("mqtt");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const mongodb = require("mongodb");
const express = require("express");
const jwt = require("express-jwt");
const neo4j = require("neo4j-driver");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const RateLimit = require("express-rate-limit");
const { ApolloServer } = require("apollo-server-express");
const { makeAugmentedSchema } = require("neo4j-graphql-js");
const { graphqlUploadExpress } = require("graphql-upload");

// Type definitions
const typeDefs = require("./graphql/allTypeDefs");

// Resolvers
const resolvers = require("./graphql/allResolvers");

// Forge Endpoints
const Derivatives3LeggedAPI = require("./api/endpoints/derivatives3Legged");
const ForgeAPI = require("./api/endpoints/forge");
const DMAPI = require("./api/endpoints/dm");

//Forge Services
const DerivativesSvc = require("./api/services/DerivativesSvc");
const ServiceManager = require("./api/services/SvcManager");
const LMVProxySvc = require("./api/services/LMVProxySvc");
const SocketSvc = require("./api/services/SocketSvc");
const UploadSvc = require("./api/services/UploadSvc");
const ForgeSvc = require("./api/services/ForgeSvc");
const OssSvc = require("./api/services/OssSvc");
const DMSvc = require("./api/services/DMSvc");

const config = require("../config/config");

async function startApolloServer() {
  // MONGODB SETUP
  const mongodbClient = mongodb.MongoClient;
  const mongodbURI = process.env.MONGO_URI;
  const deviceRoot = "demo/device/";

  mongodbClient.connect(mongodbURI, setupCollection);

  function setupCollection(err, mongoClient) {
    if (err) throw err;
    console.log("🔰 MongoDB-client ---> connected");

    // MQTT CONNECTION DETAILS
    const mqttHost = process.env.MQTT_HOST;
    const mqttPort = process.env.MQTT_PORT;
    const mqttClientId = `mqtt_${Math.random().toString(16).slice(3)}`;
    const mqttConnectUrl = `mqtts://${mqttHost}:${mqttPort}`;

    // FIRST CONNECT TO MQTT BROKER AND CREATE MQTT CLIENT
    const mqttClient = mqtt.connect(mqttConnectUrl, {
      clientId: mqttClientId,
      clean: true,
      connectTimeout: 4000,
      username: process.env.MQTT_USERNAME,
      password: process.env.MQTT_PASSWORD,
      reconnectPeriod: 1000,
      rejectUnauthorized: false, //required for testing self-signed certs
    });

    // DEFINE MQTT TOPIC TO SUBSCRIBE TO
    const topic = "sensors/temp-humidity-sensor/tts5";
    const topicRoot = "sensors/";

    // MQTT CLIENT SHOULD SUBSCRIBE TO TOPIC AFTER CONNECTING TO HOST
    mqttClient.on("connect", () => {
      console.log("⚡ MQTT-client ---> Connected");
      mqttClient.subscribe([topic], () => {
        console.log(`✅ Subscribed to topic '${topic}'`);
      });
    });

    // LOGIC WHEN CLIENT CONNECTS TO SOCKET-IO
    io.on("connection", (socket) => {
      console.log(`🌀 Socket.io-client:${socket.id} connected`);
    });

    // MQTT CLIENT SHOULD INSERT EACH RECIEVED PAYLOAD DATA INTO MONGODB
    mqttClient.on("message", async (topic, payload) => {
      // CONVERT BUFFER PAYLOAD TO A STRING
      // THEN MAKE IT A JAVASCRIPT OBJECT
      const jsonPayload = JSON.parse(payload.toString());

      // EXTRACT INFO FROM OBJECT PAYLOAD
      const {
        Humidity,
        Temperature_C,
        Temperature_F,
        HeatIndex_C,
        HeatIndex_F,
      } = jsonPayload;

      // CREATE DB COLLECTION
      const db = mongoClient.db("mqtt-database");
      const collection = db.collection("mqtt-temp-hum");

      // GENERATE DEVICE ID FROM TOPIC
      const deviceId = topic.replace(topicRoot, "");

      // INSERT NEW DATA INTO COLLECTION
      collection.updateOne(
        { _id: deviceId },
        {
          $push: {
            data: {
              point: {
                Humidity,
                Temperature_C,
                Temperature_F,
                HeatIndex_C,
                HeatIndex_F,
                timeStamp: new Date(),
              },
            },
          },
        },
        { upsert: true },
        function (err, docs) {
          if (err) {
            console.log("Insert fail");
          } // Improve error handling
        }
      );

      // CREATE A CHANGE STREAM ON THE "mqtt-temp-hum" COLLECTION
      // [OPTIONAL] CREATE PIPELINE CONFIG FOR THE CHANGE STREAM.
      // This will be a .pipeline function on watch
      // { fullDocument: 'updateLookup' } provides us the whole copy of the input data
      const changeStream = await collection.watch({ fullDocument: "updateLookup" });

      const next = await changeStream.next();

      // get the index of the latest data point
      const latestDataPointIdx = next.fullDocument.data.length - 1;

      // emit the latest data point to the client using socket.io
      io.emit(
        "mqtt-temp-hum-data",
        next.fullDocument.data[latestDataPointIdx]
      )
    });

    // MQTT CLIENT ERROR LOGIC IS CONNECTION TO HOST FAILS
    mqttClient.on("error", (error) => {
      console.log("⚠️ Can't connect" + error);
    });
  }

  // GRAPHQL SETUP
  const schema = makeAugmentedSchema({
    typeDefs,
    resolvers,
    config: {
      auth: {
        isAuthenticated: true,
        // hasScope: true
      },
    },
  });

  ///////////////////////////////////////////////////////////////////////////////////////
  // NEO4J Driver instance to connect to the DB (provide credentials)
  //
  ///////////////////////////////////////////////////////////////////////////////////////
  const driver = neo4j.driver(
    process.env.DOCKER_NEO4J_URI || config.database.neo4jUri,
    neo4j.auth.basic(
      process.env.DOCKER_NEO4J_USER || config.database.neo4jUser,
      process.env.DOCKER_NEO4J_PASSWORD || config.database.neo4jPassword
    )
  );

  ///////////////////////////////////////////////////////////////////////////////////////
  // Create a new ApolloServer instance, serving the GraphQL schema
  // created using makeAugmentedSchema above and injecting the Neo4j driver
  // instance into the context object so it is available in the
  // generated resolvers to connect to the database.
  //
  ///////////////////////////////////////////////////////////////////////////////////////
  const server = new ApolloServer({
    context: ({ req }) => {
      return {
        req,
        driver,
        session: req.session,
        cypherParams: {
          currentUserId: req && req.user && req.user.sub,
        },
        neo4jDatabase: process.env.NEO4J_DATABASE,
      };
    },
    schema,
    introspection: true,
  });

  ///////////////////////////////////////////////////////////////////////////////////////
  // new change in apollo server v3
  // if using apollo-server-express, you have to insert a call
  // to await server.start() between server = new ApolloServer
  // and server.applyMiddleware
  // https://www.apollographql.com/docs/apollo-server/api/apollo-server/#start
  //
  ///////////////////////////////////////////////////////////////////////////////////////
  await server.start();

  ///////////////////////////////////////////////////////////////////////////////////////
  // Initialize express app
  //
  ///////////////////////////////////////////////////////////////////////////////////////
  const app = express();

  ///////////////////////////////////////////////////////////////////////////////////////
  // Bind middleware to the app
  // https://www.apollographql.com/docs/apollo-server/api/apollo-server/#applymiddleware
  //
  ///////////////////////////////////////////////////////////////////////////////////////
  const limiter = new RateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    delayMs: 0, // disabled
    max: 1000,
  });

  app.use(
    session({
      secret: "forge-ql",
      cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24, // 24h session
      },
      resave: false,
      saveUninitialized: true,
    })
  );

  // useful middleware TODO: delineate the uses
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.set("trust proxy", 1);
  app.use(cookieParser());
  // app.use(helmet());
  app.use(limiter);
  app.use(cors());

  // 1.) file compression middleware
  app.use(compression());

  // 2.) gql upload express middleware
  app.use(
    graphqlUploadExpress({
      maxFileSize: 100000000,
      maxFiles: 20,
    })
  );

  // 3.) jwt middleware
  app.use(
    jwt({
      secret: config.JWT_SECRET,
      algorithms: ["RS256"],
      credentialsRequired: false,
    })
  );

  ///////////////////////////////////////////////////////////
  // Services setup
  //
  ///////////////////////////////////////////////////////////
  const derivativesSvc = new DerivativesSvc();

  const lmvProxySvc = new LMVProxySvc({
    endpoint: "developer.api.autodesk.com",
  });

  const forgeSvc = new ForgeSvc(config.forge);

  const uploadSvc = new UploadSvc({
    tempStorage: "../TMP", //FIXME: Check original
  });

  const ossSvc = new OssSvc();
  const dmSvc = new DMSvc();

  ServiceManager.registerService(derivativesSvc);
  ServiceManager.registerService(uploadSvc);
  ServiceManager.registerService(forgeSvc);
  ServiceManager.registerService(ossSvc);
  ServiceManager.registerService(dmSvc);

  ///////////////////////////////////////////////////////////
  // API Routes setup
  //
  ///////////////////////////////////////////////////////////
  app.use("/api/derivatives3Legged", Derivatives3LeggedAPI());
  app.use("/api/forge", ForgeAPI(config.forge));
  app.use("/api/dm", DMAPI());
  // forge auth
  app.use("/api/forge/oauth", require("./api/endpoints/oauth"));
  // research lbd
  app.use("/api/lbd", require("./api/endpoints/lbd"))

  ///////////////////////////////////////////////////////////
  // Viewer GET Proxy
  //
  ///////////////////////////////////////////////////////////
  const proxy2legged = lmvProxySvc.generateProxy("lmv-proxy-2legged", () =>
    forgeSvc.get2LeggedToken()
  );

  app.get("/lmv-proxy-2legged/*", proxy2legged);

  const proxy3legged = lmvProxySvc.generateProxy(
    "lmv-proxy-3legged",
    (session) => forgeSvc.get3LeggedTokenMaster(session)
  );

  app.get("/lmv-proxy-3legged/*", proxy3legged);

  // Specify host, port and path for GraphQL endpoint
  const port = config.HOST_PORT || 5000;
  const path = config.HOST_PATH || "/api/graphql";
  const host = config.HOST_URL || "127.0.0.1";

  // Mount apollo middleware here
  server.applyMiddleware({ app, path });

  await new Promise((resolve) => app.listen({ port }, resolve));
  console.log(`🚀 Server ready at http://${host}:${port}${server.graphqlPath}`);
  return { server, app };
}

// START THE SERVER
startApolloServer();
