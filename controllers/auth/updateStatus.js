const asyncHandler = require("express-async-handler");

const { User } = require("../../models");

const HttpError = require("../../helpers");

const updateStatus = asyncHandler(async (req, res) => {
  const { subscription } = req.body;
  const { _id } = req.user;

  const result = await User.findByIdAndUpdate(
    { _id },
    { subscription },
    { new: true }
  );
  if (!result) {
    throw HttpError(404, "Missing field subscription");
  }

  res.status(200).json({ code: 200, ResponseBody: result });
});

module.exports = updateStatus;
