const Joi = require("joi");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const statusList = ["starter", "pro", "business"];

const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const statusSchema = Joi.object({
  subscription: Joi.string()
    .valid(...statusList)
    .required(),
});

module.exports = {
  registerSchema,
  loginSchema,
  statusSchema,
};
