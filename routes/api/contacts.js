const express = require("express");

const controller = require("../../controllers/contactsControllers");

const { validateBody } = require("../../utils");

const schemas = require("../../schemas/contacts");

const router = express.Router();

router.get("/", controller.getAllContacts);

router.get("/:contactId", controller.getContactById);

router.post("/", validateBody(schemas.addSchema), controller.postContact);

router.delete("/:contactId", controller.deleteContact);

router.put(
  "/:contactId",
  validateBody(schemas.addSchema),
  controller.updateContactById
);

module.exports = router;
