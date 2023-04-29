const asyncHandler = require("express-async-handler");

const { User } = require("../../models");
const { HttpError } = require("../../helpers");

const verify = asyncHandler(async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  const confirmedUser = await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  if (!confirmedUser) {
    throw HttpError(404, "Unable confirm user");
  }

  return res.status(200).json({
    Status: 200,
    ResponseBody: {
      message: "Verification successful",
    },
  });
});

module.exports = verify;
