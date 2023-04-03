const fs = require("fs").promises;
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf8");

  return JSON.parse(data);
}

function updateContact(contact) {
  return fs.writeFile(contactsPath, JSON.stringify(contact), "utf8");
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === contactId);

  return contact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const removeContact = contacts.filter((contact) => contact.id !== contactId);

  return updateContact(removeContact);
}

async function addContact(contact) {
  const contacts = await listContacts();

  const newContacts = { ...contact, id: nanoid() };
  contacts.push(newContacts);

  await updateContact(contacts);

  return newContacts;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
