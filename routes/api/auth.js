const express = require("express");

const { authenticate } = require("../../middleware");

const { validateBody } = require("../../utils");

const { authSchema } = require("../../schemas");

const { authControllers } = require("../../controllers");

const router = express.Router();

router.post(
  "/register",
  validateBody(authSchema.registerSchema),
  authControllers.registration
);

router.post(
  "/login",
  validateBody(authSchema.loginSchema),
  authControllers.login
);

router.get("/current", authenticate, authControllers.getCurrentUser);

router.post("/logout", authenticate, authControllers.logout);

router.patch(
  "/",
  authenticate,
  validateBody(authSchema.statusSchema),
  authControllers.updateStatus
);
module.exports = router;
