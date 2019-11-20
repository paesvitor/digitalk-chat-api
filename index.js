const express = require("express");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3001;
const HOST = "0.0.0.0";

const app = express();

app.get("/", (req, res) => {
  res.send("Oi");
});

app.listen(PORT, HOST);
