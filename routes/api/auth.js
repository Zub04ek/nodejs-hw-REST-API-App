const express = require("express");

const { validateBody, authenticate, upload } = require("../../middlewares");
const {
  registerSchema,
  loginSchema,
  updateSubscriptionSchema,
  userEmailSchema,
} = require("../../schemas/authSchemas");
const {
  register,
  verify,
  resendVerifyEmail,
  login,
  getCurrent,
  updateSubscription,
  logout,
  updateAvatar,
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
router.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar);
router.get("/verify/:verificationToken", verify);
router.post("/verify", validateBody(userEmailSchema), resendVerifyEmail);

module.exports = router;
