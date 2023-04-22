const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const path = require("path");
const envPath = path.join(__dirname, "..", "..", "config", ".env");
require("dotenv").config({ path: envPath });

const { User } = require("../../models");

const HttpError = require("../../helpers");

const { SECRET_KEY } = process.env;

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  const userWithToken = await User.findOneAndUpdate(user._id, { token });
  if (!userWithToken) {
    throw HttpError(400, "Unable to save token");
  }

  return res.status(200).json({
    Status: 200,
    message: "Ok",
    ResponseBody: {
      token,
      user: {
        email,
        subscription: user.subscription,
      },
    },
  });
});

module.exports = login;
