const { ApolloServer } = require("apollo-server-lambda");
const neo4j = require("neo4j-driver");
const express = require("express");
const { graphqlUploadExpress } = require("graphql-upload");
const compression = require("compression");
const { makeAugmentedSchema } = require("neo4j-graphql-js");
const jwt = require("jsonwebtoken");
const jwks = require("jwks-rsa");
const typeDefs = require("./allTypeDefs");
const resolvers = require("./allResolvers_netlify");

const client = jwks({
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
});

const getPublicKey = (header, callback) => {
  client.getSigningKey(header.kid, (err, key) => {
    const publicKey = key.publicKey || key.rsaPublicKey;
    callback(null, publicKey);
  });
};

const schema = makeAugmentedSchema({
  typeDefs,
  resolvers,
  config: {
    auth: {
      isAuthenticated: true,
      // hasScope: true,
    },
  },
});

const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
);

const server = new ApolloServer({
  schema,
  context: async ({ event }) => {
    const token =
      event &&
      event.headers &&
      event.headers.authorization &&
      event.headers.authorization.slice(7);

    if (!token) {
      return {
        driver,
      };
    }

    const authResult = new Promise((resolve, reject) => {
      jwt.verify(
        token,
        getPublicKey,
        {
          algorithms: ["RS256"],
        },
        (error, decoded) => {
          if (error) {
            reject({ error });
          }
          if (decoded) {
            resolve(decoded);
          }
        }
      );
    });

    const decoded = await authResult;

    return {
      driver,
      req: event,
      cypherParams: {
        currentUserId: decoded.sub,
      },
    };
  },
  introspection: true,
});

exports.handler = server.createHandler({
  // FIXME: Migrade to v3 when ready to fix this middleware
  expressAppFromMiddleware(middleware) {
    // in apollo version 3, you can now provide your
    // own express app with the expressAppFromMiddleware
    // option to createHandler. This allows you to inject
    // custom middleware, which wasnt possible in ASv2

    // intitialize express app
    const app = express();

    // Bind middleware to the app

    // 1.) file compression middleware
    app.use(compression());

    // 2.) gql upload express middleware
    app.use(
      graphqlUploadExpress({
        maxFileSize: 100000000,
        maxFiles: 20,
      })
    );

    app.use(middleware);
    return app;
  },
});
