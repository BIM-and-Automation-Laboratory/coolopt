require("dotenv").config({ path: "../server/.env" });

const ENV = process.env.NODE_ENV;

const HOST_URL = process.env.HOST_URL;
const HOST_PATH = process.env.HOST_PATH;
const HOST_PORT = process.env.HOST_PORT;

const NEO4J_URI = process.env.NEO4J_URI;
const NEO4J_USER = process.env.NEO4J_USER;
const NEO4J_PASSWORD = process.env.NEO4J_PASSWORD;

const JWT_SECRET = process.env.JWT_SECRET;

const GCP_TYPE = process.env.GCP_TYPE;
const GCP_PROJECT_ID = process.env.GCP_PROJECT_ID;
const GCP_PRIVATE_KEY_ID = process.env.GCP_PRIVATE_KEY_ID;
const GCP_PRIVATE_KEY = process.env.GCP_PRIVATE_KEY;
const GCP_CLIENT_EMAIL = process.env.GCP_CLIENT_EMAIL;
const GCP_CLIENT_ID = process.env.GCP_CLIENT_ID;
const GCP_AUTH_URI = process.env.GCP_AUTH_URI;
const GCP_TOKEN_URI = process.env.GCP_TOKEN_URI;
const GCP_AUTH_PROVIDER_X509_CERT_URL =
  process.env.GCP_AUTH_PROVIDER_X509_CERT_URL;
const GCP_CLIENT_X509_CERT_URL = process.env.GCP_CLIENT_X509_CERT_URL;

/////////////////////////////////////////////////////////////////////
// DEVELOPMENT CONFIGS
//
/////////////////////////////////////////////////////////////////////
const development = {
  HOST_URL,
  HOST_PORT,
  HOST_PATH,
  JWT_SECRET,

  client: {
    apiUrl: `${HOST_URL}:${HOST_PORT}/api`,
    host: `${HOST_URL}`,
    env: "development",
    port: HOST_PORT,
  },

  database: {
    neo4jUri: NEO4J_URI,
    neo4jUser: NEO4J_USER,
    neo4jPassword: NEO4J_PASSWORD,
  },

  googleCloud: {
    gcpType: GCP_TYPE,
    gcpProjectId: GCP_PROJECT_ID,
    gcpPrivateKeyId: GCP_PRIVATE_KEY_ID,
    gcpPrivateKey: GCP_PRIVATE_KEY,
    gcpClientEmail: GCP_CLIENT_EMAIL,
    gcpClientId: GCP_CLIENT_ID,
    gcpAuthUri: GCP_AUTH_URI,
    gcpTokenUri: GCP_TOKEN_URI,
    gcpAuthProviderX509CertUrl: GCP_AUTH_PROVIDER_X509_CERT_URL,
    gcpClientX509CertUrl: GCP_CLIENT_X509_CERT_URL,
  },

  layouts: {
    index: "development.index.ejs",
  },

  forge: {
    oauth: {
      redirectUri: `${HOST_URL}:${HOST_PORT}/api/forge/callback/oauth`,
      authenticationUri: "/authentication/v1/authenticate",
      refreshTokenUri: "/authentication/v1/refreshtoken",
      authorizationUri: "/authentication/v1/authorize",
      accessTokenUri: "/authentication/v1/gettoken",

      baseUri: "https://developer.api.autodesk.com",
      client_secret: "3TMH0OQDpl3kwZEb",
      client_id: "0F01kBllIU4kX1mHZgFqfMDzcCopfTYy",

      scopes: {
        // Required scopes for the server-side application
        internal: [
          "bucket:create",
          "bucket:read",
          "data:read",
          "data:create",
          "data:write",
        ],
        // Required scope for the client-side viewer
        public: ["viewables:read"],
      },
    },

    hooks: {
      callbackUrl: `https://dcc54956.ngrok.io/api/forge/callback/hooks`,
    },

    viewer: {
      viewer3D:
        "https://developer.api.autodesk.com/derivativeservice/v2/viewers/viewer3D.js?v=4.0.0",
      threeJS:
        "https://developer.api.autodesk.com/derivativeservice/v2/viewers/three.js?v=4.0.0",
      style:
        "https://developer.api.autodesk.com/derivativeservice/v2/viewers/style.css?v=4.0.0",

      // viewer3D: '/resources/libs/lmv/4.0.1/viewer3D.js',
      // threeJS:  '/resources/libs/lmv/4.0.1/three.js',
      // style:    '/resources/libs/lmv/4.0.1/style.css'
    },
  },
};

/////////////////////////////////////////////////////////////////////
// TESTING CONFIGS
//
/////////////////////////////////////////////////////////////////////
const testing = {
  HOST_URL,
  HOST_PORT,
  HOST_PATH,
  JWT_SECRET,

  client: {
    apiUrl: `${HOST_URL}:${HOST_PORT}/api`,
    host: `${HOST_URL}`,
    env: "development",
    port: HOST_PORT,
  },

  database: {
    neo4jUri: NEO4J_URI,
    neo4jUser: NEO4J_USER,
    neo4jPassword: NEO4J_PASSWORD,
  },

  googleCloud: {
    gcpType: GCP_TYPE,
    gcpProjectId: GCP_PROJECT_ID,
    gcpPrivateKeyId: GCP_PRIVATE_KEY_ID,
    gcpPrivateKey: GCP_PRIVATE_KEY,
    gcpClientEmail: GCP_CLIENT_EMAIL,
    gcpClientId: GCP_CLIENT_ID,
    gcpAuthUri: GCP_AUTH_URI,
    gcpTokenUri: GCP_TOKEN_URI,
    gcpAuthProviderX509CertUrl: GCP_AUTH_PROVIDER_X509_CERT_URL,
    gcpClientX509CertUrl: GCP_CLIENT_X509_CERT_URL,
  },

  layouts: {
    index: "development.index.ejs",
  },

  forge: {
    oauth: {
      redirectUri: `${HOST_URL}:${HOST_PORT}/api/forge/callback/oauth`,
      authenticationUri: "/authentication/v1/authenticate",
      refreshTokenUri: "/authentication/v1/refreshtoken",
      authorizationUri: "/authentication/v1/authorize",
      accessTokenUri: "/authentication/v1/gettoken",

      baseUri: "https://developer.api.autodesk.com",
      client_secret: "3TMH0OQDpl3kwZEb",
      client_id: "0F01kBllIU4kX1mHZgFqfMDzcCopfTYy",

      scopes: {
        // Required scopes for the server-side application
        internal: [
          "bucket:create",
          "bucket:read",
          "data:read",
          "data:create",
          "data:write",
        ],
        // Required scope for the client-side viewer
        public: ["viewables:read"],
      },
    },

    hooks: {
      callbackUrl: `https://dcc54956.ngrok.io/api/forge/callback/hooks`,
    },

    viewer: {
      viewer3D:
        "https://developer.api.autodesk.com/derivativeservice/v2/viewers/viewer3D.js?v=4.0.0",
      threeJS:
        "https://developer.api.autodesk.com/derivativeservice/v2/viewers/three.js?v=4.0.0",
      style:
        "https://developer.api.autodesk.com/derivativeservice/v2/viewers/style.css?v=4.0.0",

      // viewer3D: '/resources/libs/lmv/4.0.1/viewer3D.js',
      // threeJS:  '/resources/libs/lmv/4.0.1/three.js',
      // style:    '/resources/libs/lmv/4.0.1/style.css'
    },
  },
};

/////////////////////////////////////////////////////////////////////
// PRODUCTION CONFIGS
//
/////////////////////////////////////////////////////////////////////
const production = {
  HOST_URL,
  HOST_PORT,
  HOST_PATH,
  JWT_SECRET,

  client: {
    apiUrl: `${HOST_URL}:${HOST_PORT}/api`,
    host: `${HOST_URL}`,
    env: "development",
    port: HOST_PORT,
  },

  database: {
    neo4jUri: NEO4J_URI,
    neo4jUser: NEO4J_USER,
    neo4jPassword: NEO4J_PASSWORD,
  },

  googleCloud: {
    gcpType: GCP_TYPE,
    gcpProjectId: GCP_PROJECT_ID,
    gcpPrivateKeyId: GCP_PRIVATE_KEY_ID,
    gcpPrivateKey: GCP_PRIVATE_KEY,
    gcpClientEmail: GCP_CLIENT_EMAIL,
    gcpClientId: GCP_CLIENT_ID,
    gcpAuthUri: GCP_AUTH_URI,
    gcpTokenUri: GCP_TOKEN_URI,
    gcpAuthProviderX509CertUrl: GCP_AUTH_PROVIDER_X509_CERT_URL,
    gcpClientX509CertUrl: GCP_CLIENT_X509_CERT_URL,
  },

  layouts: {
    index: "development.index.ejs",
  },

  forge: {
    oauth: {
      redirectUri: `${HOST_URL}:${HOST_PORT}/api/forge/callback/oauth`,
      authenticationUri: "/authentication/v1/authenticate",
      refreshTokenUri: "/authentication/v1/refreshtoken",
      authorizationUri: "/authentication/v1/authorize",
      accessTokenUri: "/authentication/v1/gettoken",

      baseUri: "https://developer.api.autodesk.com",
      client_secret: "3TMH0OQDpl3kwZEb",
      client_id: "0F01kBllIU4kX1mHZgFqfMDzcCopfTYy",

      scopes: {
        // Required scopes for the server-side application
        internal: [
          "bucket:create",
          "bucket:read",
          "data:read",
          "data:create",
          "data:write",
        ],
        // Required scope for the client-side viewer
        public: ["viewables:read"],
      },
    },

    hooks: {
      callbackUrl: `https://dcc54956.ngrok.io/api/forge/callback/hooks`,
    },

    viewer: {
      viewer3D:
        "https://developer.api.autodesk.com/derivativeservice/v2/viewers/viewer3D.js?v=4.0.0",
      threeJS:
        "https://developer.api.autodesk.com/derivativeservice/v2/viewers/three.js?v=4.0.0",
      style:
        "https://developer.api.autodesk.com/derivativeservice/v2/viewers/style.css?v=4.0.0",

      // viewer3D: '/resources/libs/lmv/4.0.1/viewer3D.js',
      // threeJS:  '/resources/libs/lmv/4.0.1/three.js',
      // style:    '/resources/libs/lmv/4.0.1/style.css'
    },
  },
};

const config = {
  development,
  testing,
  production,
};

module.exports = config["development"];
