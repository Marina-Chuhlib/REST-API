const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const gravatar = require("gravatar");

const { User } = require("../../models");

const HttpError = require("../../helpers");

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

  const result = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });
  if (!result) {
    throw HttpError(404, "Controller: unable to save user");
  }

  res.status(201).json({
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
