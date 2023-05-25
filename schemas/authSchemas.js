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

module.exports = {
  registerSchema,
  loginSchema,
  updateSubscriptionSchema,
};
