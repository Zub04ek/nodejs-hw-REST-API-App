const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");
const contactPath = path.join(__dirname, "contacts.json");

const writeDb = (contacts) => {
  return fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
};

const listContactsService = async () => {
  const contacts = await fs.readFile(contactPath);
  return JSON.parse(contacts);
};

const getContactByIdService = async (contactId) => {
  const contacts = await listContactsService();
  return contacts.find((contact) => contact.id === contactId) || null;
};

const removeContactService = async (contactId) => {
  const contacts = await listContactsService();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [deletedContact] = contacts.splice(index, 1);
  await writeDb(contacts);
  return deletedContact;
};

const addContactService = async (body) => {
  const newContact = {
    id: nanoid(),
    ...body,
  };
  const contacts = await listContactsService();
  contacts.push(newContact);
  await writeDb(contacts);
  return newContact;
};

const updateContactService = async (contactId, body) => {
  const contacts = await listContactsService();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id: contactId, ...body };
  await writeDb(contacts);
  return contacts[index];
};

module.exports = {
  listContactsService,
  getContactByIdService,
  removeContactService,
  addContactService,
  updateContactService,
};
