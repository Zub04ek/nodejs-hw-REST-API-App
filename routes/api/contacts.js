const express = require("express");
const {
  getContacts,
  getContactById,
  addContact,
  deleteContactById,
  updateContactById,
  updateStatusContact,
} = require("../../controllers/contactsControllers");
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const {
  addSchema,
  updateFavoriteSchema,
} = require("../../schemas/contactsSchemas");

const router = express.Router();

router
  .route("/")
  .get(authenticate, getContacts)
  .post(authenticate, validateBody(addSchema), addContact);

router
  .route("/:contactId")
  .get(authenticate, isValidId, getContactById)
  .put(authenticate, isValidId, validateBody(addSchema), updateContactById)
  .delete(authenticate, isValidId, deleteContactById);

router
  .route("/:contactId/favorite")
  .patch(
    authenticate,
    isValidId,
    validateBody(updateFavoriteSchema),
    updateStatusContact
  );

module.exports = router;
