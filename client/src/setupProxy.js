const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api/graphql",
    createProxyMiddleware({
      target: process.env.DOCKER_GQL_PROXY || process.env.LOCAL_GQL_PROXY,
      changeOrigin: true,
    })
  );

  app.use(
    "/api/forge/oauth",
    createProxyMiddleware({
      target: "http://127.0.0.1:5000/",
      changeOrigin: true,
    })
  );

  app.use(
    "/api/lbd/semantic-injection",
    createProxyMiddleware({
      target: "http://127.0.0.1:5001/",
      changeOrigin: true,
    })
  );
};
