const ServiceManager = require("../services/SvcManager");
const compression = require("compression");
const express = require("express");

module.exports = function() {
  /// //////////////////////////////////////////////////////
  //
  //
  /// //////////////////////////////////////////////////////
  const router = express.Router();

  const shouldCompress = (req, res) => {
    return true;
  };

  router.use(
    compression({
      filter: shouldCompress,
    })
  );

  /// //////////////////////////////////////////////////////////////////////////
  // POST /message
  // Post socket message
  //
  /// //////////////////////////////////////////////////////////////////////////
  router.post("/message", async (req, res) => {
    try {
      var payload = JSON.parse(req.body.payload);

      var socketSvc = ServiceManager.getService("SocketSvc");

      socketSvc.broadcast(payload.msgId, payload.msg, payload.filter);

      res.json(payload);
    } catch (ex) {
      res.status(ex.statusCode || 500);
      res.json(ex);
    }
  });

  return router;
};
