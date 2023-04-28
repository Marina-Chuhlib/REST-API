const { Contact } = require("../../models");

const asyncHandler = require("express-async-handler");

const { HttpError } = require("../../helpers");

const updateContactById = asyncHandler(async (req, res) => {
  const { contactId } = req.params;
  if (!contactId) {
    throw HttpError(404, "Contact not found, wrong id");
  }

  const updateContact = await Contact.findByIdAndUpdate(
    { _id: contactId },
    { ...req.body },
    { new: true }
  );
  if (!updateContact) {
    throw HttpError(404, `Contact not found, wrong id: ${contactId}`);
  }

  res.status(200).json({ code: 200, data: updateContact });
});

module.exports = updateContactById;
