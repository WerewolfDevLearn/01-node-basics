const path = require('path');
const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');
const contactsPath = path.resolve('./db/contacts.json');

function getContacts() {
  return fs
    .readFile(contactsPath, 'utf-8')
    .then(contactsList => JSON.parse(contactsList))
    .catch(error => console.log(error.massage));
}

function listContacts() {
  try {
    getContacts().then(contacts => console.table(contacts));
  } catch (error) {
    throw error;
  }
}
// listContacts();

function getContactById(contactId) {
  try {
    getContacts()
      .then(contacts => contacts.find(contact => contact.id === contactId))
      .then(contact => console.table(contact));
  } catch (error) {
    throw error;
  }
}

// getContactById(7);

function removeContact(contactId) {
  try {
    getContacts().then(contacts => {
      const isID = contacts.some(contact => contact.id === contactId);

      if (!isID) {
        console.log(`No such contact with id:${contactId}`);
        return;
      }
      const filtredContacst = contacts.filter(
        contact => contact.id !== contactId,
      );
      const contactsToString = JSON.stringify(filtredContacst, null, 2);

      fs.writeFile(contactsPath, contactsToString, 'utf-8').then(
        console.log('Ok'),
        console.table(filtredContacst),
      );
    });
  } catch (error) {
    throw error;
  }
}

function addContact(name, email, phone) {
  try {
    const id = uuidv4();
    const contact = {
      id,
      name,
      email,
      phone,
    };
    getContacts().then(contacts => {
      const newContactsList = [...contacts, contact];
      const newContactsListToString = JSON.stringify(newContactsList, null, 2);
      fs.writeFile(contactsPath, newContactsListToString, 'utf-8');
      console.table(newContactsList);
    });
  } catch (error) {
    throw error;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
