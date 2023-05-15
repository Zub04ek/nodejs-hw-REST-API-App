const { HttpError, ctrlWrapper } = require("../utils");
const {
  listContactsService,
  getContactByIdService,
  addContactService,
  updateContactService,
  removeContactService,
} = require("../models/contacts");

const getContactsList = async (req, res, next) => {
  const contacts = await listContactsService();
  res.json(contacts);
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactByIdService(contactId);
  if (!contact) {
    throw new HttpError(404, "Not found");
  }
  res.json(contact);
};

const addContact = async (req, res, next) => {
  const newContact = await addContactService(req.body);
  res.status(201).json(newContact);
};

const deleteContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const deletedContact = await removeContactService(contactId);
  if (!deletedContact) {
    throw new HttpError(404, "Not found");
  }
  res.json({ message: "contact deleted" });
};

const updateContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const updatedContact = await updateContactService(contactId, req.body);
  if (!updatedContact) {
    throw new HttpError(404, "Not found");
  }
  res.json(updatedContact);
};

module.exports = {
  getContactsList: ctrlWrapper(getContactsList),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  deleteContactById: ctrlWrapper(deleteContactById),
  updateContactById: ctrlWrapper(updateContactById),
};
