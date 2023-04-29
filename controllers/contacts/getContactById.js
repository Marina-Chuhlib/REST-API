const { Contact } = require("../../models");

const asyncHandler = require("express-async-handler");

const { HttpError } = require("../../helpers");

const getContactById = asyncHandler(async (req, res) => {
  const { contactId } = req.params;
  if (!contactId) {
    throw HttpError(404, "Wrong id");
  }

  const oneContact = await Contact.findById({ _id: contactId });
  if (!oneContact) {
    throw HttpError(404, `Contact not found, wrong id: ${contactId}`);
  }
  res.status(200).json({
    code: 200,
    message: "success",
    data: oneContact,
  });
});

module.exports = getContactById;
