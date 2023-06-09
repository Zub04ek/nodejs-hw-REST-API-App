const Joi = require("joi");

const subscriptionList = ["starter", "pro", "business"];

const registerSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required().email(),
  subscription: Joi.string(),
});

const loginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required().email(),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .required()
    .valid(...subscriptionList),
});

const userEmailSchema = Joi.object({
  email: Joi.string().required().email().messages({
    "any.required": "missing required field email",
  }),
});

module.exports = {
  registerSchema,
  loginSchema,
  updateSubscriptionSchema,
  userEmailSchema,
};
