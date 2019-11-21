const bodyParser = require("body-parser");
const routes = require("./src/routes");
const mongoose = require("mongoose");
const cors = require("cors");
const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const PORT = process.env.PORT || 3000;

const corsOptions = {
  credentials: true
};

app.get("/", (req, res) => {
  res.send("API is up");
});

app.use(function(req, res, next) {
  req.io = io;
  next();
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

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(routes);

http.listen(PORT);
