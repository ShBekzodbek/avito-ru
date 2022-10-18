/** @format */

const express = require("express");

const conn = require("./src/config/connectDB");

const morgan = require("morgan");

require("dotenv").config();

const app = express();

app.use(express.json());
// mongoose-morgan
var mongooseMorgan = require("mongoose-morgan");

// Logger
app.use(
  mongooseMorgan({
    connectionString: "mongodb://localhost:27017/avito-ru",
  })
);

app.use(morgan("dev"));

//connecting DB
conn();

//admin route
app.use("/admin", require("./src/routes/admin"));

//login route
app.use("/login", require("./src/routes/register"));

app.use((req, res) => {
  res.status(404).send("<h1>Page not found </h1>");
});

const port = process.env.PORT || 5000;
app.listen(port, (err, req, res) => {
  if (err) {
    res
      .status(500)
      .send(
        "There may some technical error " <
          br >
          "Please wait for developer respond"
      );
    console.log("this is hato : " + err);
  }

  console.log(`Listenig ..... ${port}`);
});
