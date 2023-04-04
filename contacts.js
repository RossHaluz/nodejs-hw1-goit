const fs = require("fs").promises;
const  {nanoid}  = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "./data/contacts.json");

async function listContacts() {
    const contacts = await fs.readFile(contactsPath, 'utf8');
    return JSON.parse(contacts);
  }

  function updateContacts (contact) {
    return fs.writeFile(contactsPath, JSON.stringify(contact, null, 2),  'utf8');
  }
  
  async function getContactById(contactId) {
    const contacts = await listContacts();
    return contacts.find(contact => contact.id === contactId);
  }
  
  async function removeContact(contactId) {
    const contacts = await listContacts();
    const contactIndex = contacts.findIndex(contact => contact.id === contactId);
    if(contactIndex === -1){
        return null
    }
  const [result] = contacts.splice(contactIndex, 1)
   await updateContacts(contacts);
   return result;
  }
  
  async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = {name, email, phone, id: nanoid()}
    contacts.push(newContact);
    await updateContacts(contacts)
    return newContact;
  }

  module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact
  }