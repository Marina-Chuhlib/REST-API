const contacts = require("../models/contacts");

const HttpError = require("../helpers");

const { ctrlWrapper } = require("../utils");

const getAllContacts = async (req, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const oneContact = await contacts.getContactById(contactId);
  if (!oneContact) {
    throw HttpError(404, `Contact not found, wrong id: ${contactId}`);
  }
  res.json(oneContact);
};

const postContact = async (req, res) => {
  const newContact = await contacts.addContact(req.body);
  res.status(201).json(newContact);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const deleteContact = await contacts.removeContact(contactId);
  if (!deleteContact) {
    throw HttpError(404, `Contact not found, wrong id: ${contactId}`);
  }
  res.json({
    message: "contact deleted",
  });
};

const updateContactById = async (req, res) => {
  const { contactId } = req.params;
  const updateContact = await contacts.updateContact(contactId, req.body);
  if (!updateContact) {
    throw HttpError(404, `Contact not found, wrong id: ${contactId}`);
  }

  res.json(updateContact);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  postContact: ctrlWrapper(postContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContactById: ctrlWrapper(updateContactById),
};
