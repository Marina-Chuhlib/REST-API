const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string()
    .regex(/^[A-Za-z ]+$/)
    .required()
    .messages({
      "any.required": `missing required name field`,
      "string.empty": `"name" cannot be empty`,
    }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "any.required": `missing required "email" field`,
      "string.empty": `"email" cannot be empty`,
      "string.base": `"email" must be string`,
    }),
  phone: Joi.string().required().messages({
    "any.required": `missing required "phone" field`,
    "string.empty": `"phone" cannot be empty`,
    "string.base": `"phone" must be string`,
  }),
  favorite: Joi.boolean(),
});

const statusSchema = Joi.object({
  favorite: Joi.bool().required(),
});

module.exports = {
  addSchema,
  statusSchema,
};
