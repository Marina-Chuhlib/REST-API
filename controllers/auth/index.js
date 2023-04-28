const { ctrlWrapper } = require("../../utils");

const registration = require("./registration");
const login = require("./login");
const verify = require("./verify");
const resendVerifyEmail = require("./resendVerifyEmail");
const getCurrentUser = require("./getCurrentUser");
const logout = require("./logout");
const updateStatus = require("./updateStatus");
const updateAvatar = require("./updateAvatar");

module.exports = {
  registration: ctrlWrapper(registration),
  login: ctrlWrapper(login),
  verify: ctrlWrapper(verify),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
  getCurrentUser: ctrlWrapper(getCurrentUser),
  logout: ctrlWrapper(logout),
  updateStatus: ctrlWrapper(updateStatus),
  updateAvatar: ctrlWrapper(updateAvatar),
};
