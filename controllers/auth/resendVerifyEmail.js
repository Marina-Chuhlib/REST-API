const asyncHandler = require("express-async-handler");

const path = require("path");
const envPath = path.join(__dirname, "..", "..", "config", ".env");
require("dotenv").config({ path: envPath });

const { User } = require("../../models");
const { HttpError, sendEmail } = require("../../helpers");

const { BASE_URL } = process.env;

const resendVerifyEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(404, "Email not found");
  }

  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  return res.status(200).json({
    Status: 200,
    ResponseBody: {
      message: "Verification email sent",
    },
  });
});

module.exports = resendVerifyEmail;
