const asyncHandler = require("express-async-handler");

const getCurrentUser = asyncHandler(async (req, res) => {
  const { email, subscription } = req.user;

  res.status(200).json({
    Status: 200,
    message: "Ok",
    ResponseBody: {
      user: {
        email,
        subscription,
      },
    },
  });
});

module.exports = getCurrentUser;
