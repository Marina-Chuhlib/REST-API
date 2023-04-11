const Contact = require("../models");

const asyncHandler = require("express-async-handler");

const HttpError = require("../helpers");

const { ctrlWrapper } = require("../utils");

const getAllContacts = asyncHandler(async (req, res) => {
  const result = await Contact.find({});
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res
    .status(200)
    .json({ code: 200, message: "success", data: result, qty: result.length });
});

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

const postContact = asyncHandler(async (req, res) => {
  const { name, phone } = req.body;
  if (!name || !phone) {
    throw HttpError(404, "Controller: provide all required files");
  }

  const newContact = await Contact.create({ ...req.body });
  if (!newContact) {
    throw HttpError(404, "Controller: unable to save contact");
  }
  res.status(200).json({
    code: 200,
    message: "success",
    data: newContact,
  });
});

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  console.log(contactId, "He4llo");

  const result = await Contact.findByIdAndRemove({ _id: contactId });
  if (!result) {
    throw HttpError(404, `Contact not found, wrong id: ${contactId}`);
  }

  res.status(200).json({
    code: 200,
    message: "contact deleted",
  });
};

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

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  postContact: ctrlWrapper(postContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContactById: ctrlWrapper(updateContactById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
