const express = require("express");
const fetch = require("node-fetch");

let router = express.Router();

router.post("/semantic-injection", async (req, res, next) => {
  fetch("http://127.0.0.1:5001/api/lbd/semantic-injection", {
    method: "POST",
    body: req.body,
  })
    .then((response) => response.json())
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
});

router.post("/ask", async (req, res, next) => {
  fetch("http://127.0.0.1:5001/api/lbd/ask")
    .then((response) => response.json())
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
});

module.exports = router;
