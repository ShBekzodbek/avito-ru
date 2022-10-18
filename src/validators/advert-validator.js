/** @format */

const Joi = require("joi");

const advertValidator = (advert) => {
  const schema = Joi.object().keys({
    category: Joi.string().min(3).max(200).required(),
    region: Joi.string().min(3).max(250),
    image: Joi.string(),
    attributes: Joi.array(),
    status: Joi.string().valid("draft", "moderation", "active", "closed"),
  });
  const result = schema.validate(advert);
  return result;
};

module.exports = advertValidator;
