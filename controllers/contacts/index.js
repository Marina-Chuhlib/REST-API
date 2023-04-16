const { ctrlWrapper } = require("../../utils");

const getAllContacts = require("./getAllContacts");
const getContactById = require("./getContactById");
const postContact = require("./postContact");
const deleteContact = require("./deleteContact");
const updateContactById = require("./updateContactById");
const updateStatusContact = require("./updateStatusContact");

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  postContact: ctrlWrapper(postContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
  updateContactById: ctrlWrapper(updateContactById),
};
