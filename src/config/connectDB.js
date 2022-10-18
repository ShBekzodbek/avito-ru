/** @format */

const mongoose = require("mongoose");

const { env } = process;

require("dotenv").config();

const mongo_uri = env.MONGO_URI;

const conn = async () => {
  mongoose
    .connect(mongo_uri)
    .then((result) => {
      console.log(`Connected  MongoDB...  ` );
    })
    .catch((err) => {
      console.error(`There are connecting error in mongoDB + ${err}`);
    });
};

module.exports = conn;
