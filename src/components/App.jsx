import React, { useState, useEffect } from 'react';
import shortid from 'shortid';
import ContactForm from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import Filter from './Filter/Filter';
import initialContacts from './contacts.json';

const INITIAL_STATE = {
  contacts: initialContacts,
  filter: '',
};

const App = () => {
  const [contacts, setContacts] = useState(INITIAL_STATE.contacts);
  const [filter, setFilter] = useState(INITIAL_STATE.filter);

  const addContact = data => {
    const { name, number } = data;
    if (contacts.find(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
      return;
    }
    const newContact = {
      id: shortid.generate(),
      name,
      number,
    };

    setContacts([newContact, ...contacts]);
  };

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const filterContacts = event => {
    setFilter(event.currentTarget.value);
  };

  const normalizedFilter = filter.toLowerCase();
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  useEffect(() => {
    const localContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(localContacts);
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <>
    <article class="wrapper">
      <div
    style={{
      display: 'flex',
      justifyContent: `space-around`
    }}>
    <div
     class="container">
      <h1  style={{
      textAlign: 'center'
      }}>Phonebook</h1>
      <ContactForm onSubmit={addContact} /></div>
        <div class="container">
      <Filter onChange={filterContacts} />
      <h2 style={{textAlign: 'center', marginBottom: '0' }}>Contacts</h2>
      <ContactList contacts={filteredContacts} onDelete={deleteContact} />
    </div>
        </div></article></>
  );
};

export default App;
