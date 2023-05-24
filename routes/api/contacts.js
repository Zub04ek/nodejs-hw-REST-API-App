const express = require("express");
const {
  getContacts,
  getContactById,
  addContact,
  deleteContactById,
  updateContactById,
  updateStatusContact,
} = require("../../controllers/contactsControllers");
const { validateBody, isValidId } = require("../../middlewares");
const { addSchema, updateFavoriteSchema } = require("../../schemas/contactsSchemas");

const router = express.Router();

router
  .route("/")
  .get(getContacts)
  .post(validateBody(addSchema), addContact);

router
  .route("/:contactId")
  .get(isValidId, getContactById)
  .put(isValidId, validateBody(addSchema), updateContactById)
  .delete(isValidId, deleteContactById);

router
  .route("/:contactId/favorite")
  .patch(
    isValidId,
    validateBody(updateFavoriteSchema),
    updateStatusContact
  );

module.exports = router;
