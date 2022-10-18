/** @format */

const jwt  = require('jsonwebtoken');
require("dotenv").config();

function authenticateTokenAdmin(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader;
  if (token == null) return res.status(401).send("You are not Sign up");
  jwt.verify(token, process.env.ADMIN_TOKEN, (err) => {
    if (err) return res.status(403).send("You are not Admin");
    next();
  });
}

function authenticateTokenUser(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader;
  if (token == null) return res.status(401).send("You are not Sign up");
  jwt.verify(token, process.env.SECRET_TOKEN, (err) => {
    if (err) return res.status(403).send("You are not Sign up");
    next();
  });
}

module.exports = { authenticateTokenUser, authenticateTokenAdmin };
