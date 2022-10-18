/** @format */

const express = require("express");

const User = require('../models/user-model');

const login = require("../controllers/register");

const router = express.Router();


router.post("/", login);





module.exports = login;
