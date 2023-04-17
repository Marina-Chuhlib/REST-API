const { Contact } = require("../../models");

const asyncHandler = require("express-async-handler");

const HttpError = require("../../helpers");

const updateStatusContact = asyncHandler(async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  const result = await Contact.findByIdAndUpdate(
    { _id: contactId },
    { favorite },
    { new: true }
  );

  if (!result) {
    throw HttpError(404, "Missing field favorite");
  }
  res.status(200).json({ code: 200, data: result });
});

module.exports = updateStatusContact;
