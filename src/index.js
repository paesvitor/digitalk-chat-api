require("dotenv/config");
const bodyParser = require("body-parser");
const routes = require("./routes");
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

console.log(process.env.NODE_ENV);

if (process.env === "development") {
  dbUrl = "mongodb://mongo/digitalk";
} else {
  dbUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-kklu5.mongodb.net/test?retryWrites=true&w=majority`;
}

mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch(error => {
    console.log("error", String(error));
  });

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(routes);

http.listen(PORT);
