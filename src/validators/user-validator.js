/** @format */

const Joi = require("joi");

const userValidator = (user) => {
  const schema = Joi.object().keys({
    username: Joi.string().min(3).max(200).required(),
    email: Joi.string().min(6).max(250).required(),
    password: Joi.string().min(8).max(12).required(),
    role: Joi.string().valid("admin", "moderator", "user"),
  });
  const result = schema.validate(user);
  return result;
};

module.exports = userValidator;
