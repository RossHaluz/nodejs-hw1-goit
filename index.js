const argv = require("yargs").argv;

const {listContacts, getContactById, addContact, removeContact} = require('./contacts');
 
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
        const contacts = await listContacts();
        console.log(typeof contacts, contacts);
      break;

    case "get":
        const getContact = await getContactById(id);
        console.log(getContact);
      break;

    case "add":
        const newContact = await addContact(name, email, phone)
        console.log(newContact);
      break;

    case "remove":
        const deleteContact = await removeContact(id)
        console.log(deleteContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);