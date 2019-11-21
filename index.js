const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./src/routes");
const mongoose = require("mongoose");
const cors = require("cors");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("root");
});

if (process.env === "development") {
  dbUrl = "mongodb://mongo/digitalk";
} else {
  dbUrl = "mongodb://mongo/digitalk";
}

mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch(error => {
    console.log("error", String(error));
    process.exit(-1);
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(routes);

app.listen(PORT);
