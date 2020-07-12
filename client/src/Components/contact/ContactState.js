import React, { useReducer } from 'react';
import { v4 as uuid } from 'uuid';
import ContactContext from './ContactContext';
import ContactReducer from './ContactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from '../context/Types';
const ContactState = (props) => {
  const initialstate = {
    contacts: [
      {
        id: 1,
        name: 'utsav',
        email: 'test@utsav.com',
        phone: '9255487545',
        type: 'personal',
      },
      {
        id: 2,
        name: 'chandan',
        email: 'test@chandan.com',
        phone: '9122920841',
        type: 'personal',
      },
      {
        id: 1,
        name: 'irish',
        email: 'test@irish.com',
        phone: '856789455',
        type: 'professional',
      },
    ],
    current: null,
    filtered: null,
  };
  const [state, dispatch] = useReducer(ContactReducer, initialstate);
  //ADD contact
  const addContact = (contact) => {
    contact.id = uuid();
    dispatch({ type: ADD_CONTACT, payload: contact });
  };
  //   delete contact
  const deleteContact = (id) => {
    dispatch({ type: DELETE_CONTACT, payload: id });
  };
  // set cureent
  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };
  // clear current
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRRENT });
  };
  // update cntact
  const updateContact = (contact) => {
    dispatch({ type: UPDATE_CONTACT , payload: contact });
  };

  //   filter contacts
  // clear filterR
  
  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
      }}>
      {props.children}
    </ContactContext.Provider>
  );
};
export default ContactState;
