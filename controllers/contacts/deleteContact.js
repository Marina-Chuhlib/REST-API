const { Contact } = require("../../models");

const asyncHandler = require("express-async-handler");

const HttpError = require("../../helpers");

const deleteContact = asyncHandler(async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndRemove({ _id: contactId });
  if (!result) {
    throw HttpError(404, `Contact not found, wrong id: ${contactId}`);
  }

  res.status(200).json({
    code: 200,
    message: "contact deleted",
  });
});

module.exports = deleteContact;
