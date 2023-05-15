const express = require("express");
const {
  getContactsList,
  getContactById,
  addContact,
  deleteContactById,
  updateContactById,
} = require("../../controllers/contactsControllers");
const { validateBody } = require("../../middlewares");
const { addSchema } = require("../../schemas/contactsSchema");

const router = express.Router();

router
  .route("/")
  .get(getContactsList)
  .post(validateBody(addSchema), addContact);

router
  .route("/:contactId")
  .get(getContactById)
  .put(validateBody(addSchema), updateContactById)
  .delete(deleteContactById);

module.exports = router;
