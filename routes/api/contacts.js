const express = require("express");

const { isValidId, authenticate } = require("../../middleware");
const { validateBody } = require("../../utils");

const { contactsSchema } = require("../../schemas");

const { contactController } = require("../../controllers");

const router = express.Router();

router.get("/", authenticate, contactController.getAllContacts);

router.get(
  "/:contactId",
  authenticate,
  isValidId,
  contactController.getContactById
);

router.post(
  "/",
  authenticate,
  validateBody(contactsSchema.addSchema),
  contactController.postContact
);

router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  contactController.deleteContact
);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(contactsSchema.addSchema),
  contactController.updateContactById
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(contactsSchema.statusSchema),
  contactController.updateStatusContact
);

module.exports = router;
