const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./src/routes");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";

const app = express();

app.get("/", (req, res) => {
  res.send("root");
});

if (process.env === "development") {
  dbUrl = "mongodb://localhost:27017/digitalk";
} else {
  dbUrl =
    "mongodb+srv://admin:admin@cluster0-rlodt.mongodb.net/test?retryWrites=true&w=majority";
}

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(routes);

app.listen(PORT, HOST);
