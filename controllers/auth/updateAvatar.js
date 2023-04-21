const asyncHandler = require("express-async-handler");
const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

const { User } = require("../../models");

const HttpError = require("../../helpers");

const avatarPath = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { path: tempPath, filename } = req.file;

  const avatar = await Jimp.read(tempPath);
  await avatar
    .cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE)
    .writeAsync(tempPath);

  const avatarName = `${_id}_${filename}`;
  const resultUpload = path.join(avatarPath, avatarName);
  await fs.rename(tempPath, resultUpload);
  const avatarURL = path.join("avatars", avatarName);

  await User.findByIdAndUpdate(_id, { avatarURL });

  if (!avatarURL) {
    throw HttpError(404, "Missing field avatar");
  }

  res.status(200).json({ code: 200, avatarURL });
});

module.exports = updateAvatar;
