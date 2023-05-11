const express = require("express");
const {
  getList,
  getById,
  add,
  deleteById,
  updateById,
} = require("../../controllers/contactsControllers");
const { validateBody } = require("../../middlewares");
const { addSchema } = require("../../schemas/contactsSchema");

const router = express.Router();

router.route("/").get(getList).post(validateBody(addSchema), add);

router
  .route("/:contactId")
  .get(getById)
  .put(validateBody(addSchema), updateById)
  .delete(deleteById);

module.exports = router;
