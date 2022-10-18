/** @format */

const _ = require("lodash");
const User = require("../models/user-model");

const getAllUsers = async (req, res) => {
  try {
    let page = req.query.page;
    let limit = req.query.limit;

    const users = await User.find()
      .skip((page - 1) * 10)
      .limit(limit)
      .exec();

    if (!users || users == null)
      return res.status(404).send(" no one hasn't signed up user yet ");

    res.status(200).send(users);
  } catch (error) {
    res
      .status(500)
      .send(
        "There are some technical errors in our server \n Please wait for developer help"
      );
    console.log(error);
    return;
  }
};

const deleteUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const username = await User.findById(id);
    const users = await User.findByIdAndDelete({ _id: id });
    if (!users || users == null) {
      return res.status(404).send(" no one hasn't signed up user yet ");
    }
    res.status(200).send(`Deleted this user : ${username.username}`);
  } catch (error) {
    res
      .status(500)
      .send(
        "There are some technical errors in our server \n Please wait for developer help"
      );
    console.log(error);
    return;
  }
};

const deleteAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users || users == null || users.length <= 0) {
      return res.status(404).send(" In fact , Here is empty");
    }
    const result = await User.deleteMany({ __v: 0 });
    res.status(200).send("All users were deleted ");
    console.log(result);
  } catch (error) {
    res
      .status(500)
      .send(
        "There are some technical errors in our server \n Please wait for developer help"
      );
    console.log(error);
    return;
  }
};

module.exports = { getAllUsers, deleteUserById, deleteAllUsers };
