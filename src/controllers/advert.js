/** @format */
const Advert = require("../models/advert-model");
const advertValidator = require("../validators/advert-validator");

const addAdvert = async (req, res) => {
  try {
    const { error } = advertValidator(req.body);
    if (error) {
      return res.status(400).send({
        message: error.details[0].message,
      });
    }
    const advert = new Advert({ ...req.body });
    const result = await advert.save();
    res.status(201).send({
      message: `Advert was created `,
      result,
    });
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

const getAllAdverts = async (req, res) => {
  try {
    let page = req.query.page;
    let limit = req.query.limit;
    let adverts = "";
    adverts = await Advert.find()
      .skip((page - 1) * 10)
      .limit(limit)
      .exec();

    if (!adverts || adverts == null)
      return res.status(404).send(" There is no advert yet ");

    res.status(200).send(adverts);
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

const getAdvertByCategory = async (req, res) => {
  try {
    let page = req.query.page;
    let limit = req.query.limit;
    const { category } = req.params;
    const adverts = await Advert.find({ category: category })
      .skip((page - 1) * 10)
      .limit(limit)
      .exec();

    if (!adverts || adverts == null)
      return res.status(404).send(" There is no advert yet ");
    res.status(200).send(adverts);
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

const deleteAllAdverts = async (req, res) => {
  try {
    const adverts = await Advert.find();
    if (!adverts || adverts == null || adverts.length <= 0) {
      return res.status(404).send(" In fact , Here is empty");
    }
    const result = await Advert.deleteMany({ __v: 0 });
    res.status(200).send("All adverts were deleted ");
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

module.exports = {
  getAdvertByCategory,
  getAllAdverts,
  addAdvert,
  deleteAllAdverts
};
