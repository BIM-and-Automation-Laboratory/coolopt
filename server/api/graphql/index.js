const { ApolloServer } = require("apollo-server-express");
const { makeAugmentedSchema } = require("neo4j-graphql-js");
const neo4j = require("neo4j-driver");
const depthLimit = require("graphql-depth-limit");
const typeDefs = require("./allTypeDefs");
const resolvers = require("./allResolvers");

// Config (NODE_ENV and HOT_RELOADING dependant)
const config = require("../../../config");

const api = (app, path) => {
  const schema = makeAugmentedSchema({
    typeDefs,
    resolvers,
    config: {
      auth: {
        isAuthenticated: true,
        // hasRole: true,
      },
    },
  });

  /*
   * Create a Neo4j driver instance to connect to the database
   * using credentials specified as environment variables
   * with fallback to defaults
   */
  const driver = neo4j.driver(
    config.NEO4J_URI,
    neo4j.auth.basic(config.NEO4J_USER, config.NEO4J_PASSWORD),
    {
      encrypted: config.NEO4J_ENCRYPTED ? "ENCRYPTION_ON" : "ENCRYPTION_OFF",
    }
  );

  const server = new ApolloServer({
    context: ({ req }) => {
      return {
        req,
        driver,
        session: req.session,
        neo4jDatabase: config.NEO4J_DATABASE,
      };
    },
    schema,
    introspection: true,
    playground: true,
    validationRules: [depthLimit(10)],
  });

  server.applyMiddleware({ app, path });

  return server;
};

export default api;
