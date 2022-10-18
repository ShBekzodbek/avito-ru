/** @format */
const User = require("../models/user-model");

const jwt = require("jsonwebtoken");

const userValidator = require("../validators/user-validator");

const registerAdmin = async (req, res) => {};

const register = async (req, res) => {
  try {
    const { error } = userValidator(req.body);
    if (error) {
      return res.status(400).send({
        message: error.details[0].message,
      });
    }
    const { username, email, password, role } = req.body;
    const valid = await User.findOne({ email: email });
    if (valid) {
      return res.status(403).send("This user is already exited");
    }

    const result = new User({
      username,
      email,
      password,
      role,
    });
    let accessToken = "";
    if (role != "admin") {
      accessToken = jwt.sign(role, process.env.SECRET_TOKEN);
    }
    await result.save();
    accessToken = jwt.sign(role, process.env.ADMIN_TOKEN);
    res.status(200).send({
      msg: "This is your access tokens\n",
      accessToken,
      about: `name: ${username}\n role: ${role}`,
    });
    console.log(result);
  } catch (error) {
    res
      .status(500)
      .send("There may some technical error Please wait for developer respond");
    console.log("this is hato : " + error);
  }
};

module.exports = register;
