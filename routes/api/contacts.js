const express = require("express");
const {
  getContactsList,
  getContactById,
  addContact,
  deleteContactById,
  updateContactById,
  updateStatusContact,
} = require("../../controllers/contactsControllers");
const { validateBody, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/contact");

const router = express.Router();

router
  .route("/")
  .get(getContactsList)
  .post(validateBody(schemas.addSchema), addContact);

router
  .route("/:contactId")
  .get(isValidId, getContactById)
  .put(isValidId, validateBody(schemas.addSchema), updateContactById)
  .delete(isValidId, deleteContactById);

router
  .route("/:contactId/favorite")
  .patch(
    isValidId,
    validateBody(schemas.updateFavoriteSchema),
    updateStatusContact
  );

module.exports = router;
