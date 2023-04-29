const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const path = require("path");
const envPath = path.join(__dirname, "..", "..", "config", ".env");
require("dotenv").config({ path: envPath });

const { User } = require("../../models");

const { HttpError, sendEmail } = require("../../helpers");

const { BASE_URL } = process.env;

const registration = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw HttpError(404, "Controller: provide all required files");
  }

  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const avatarURL = gravatar.url(email);

  const verificationToken = nanoid();

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  const result = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });
  if (!result) {
    throw HttpError(404, "Controller: unable to save user");
  }

  return res.status(201).json({
    Status: 201,
    message: "Created",
    ResponseBody: {
      user: {
        email: result.email,
        subscription: result.subscription,
      },
    },
  });
});

module.exports = registration;
