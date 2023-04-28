const { Contact } = require("../../models");

const asyncHandler = require("express-async-handler");

const { HttpError } = require("../../helpers");

const postContact = asyncHandler(async (req, res) => {
  const { name, phone } = req.body;
  if (!name || !phone) {
    throw HttpError(404, "Controller: provide all required files");
  }
  const { _id: owner } = req.user;
  const newContact = await Contact.create({ ...req.body, owner });
  if (!newContact) {
    throw HttpError(404, "Controller: unable to save contact");
  }
  res.status(200).json({
    code: 200,
    message: "success",
    data: newContact,
  });
});

module.exports = postContact;
