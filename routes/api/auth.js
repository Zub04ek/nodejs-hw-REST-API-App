const express = require("express");

const { validateBody, authenticate } = require("../../middlewares");
const {
  registerSchema,
  loginSchema,
  updateSubscriptionSchema,
} = require("../../schemas/authSchemas");
const {
  register,
  login,
  getCurrent,
  updateSubscription,
  logout,
} = require("../../controllers/authController");

const router = express.Router();

router.post("/register", validateBody(registerSchema), register);
router.post("/login", validateBody(loginSchema), login);
router.get("/current", authenticate, getCurrent);
router.post("/logout", authenticate, logout);
router.patch(
  "/subscription",
  authenticate,
  validateBody(updateSubscriptionSchema),
  updateSubscription
);

module.exports = router;
