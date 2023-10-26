import React, { useContext, useReducer } from "react";
import ContactContext from "./contactContext";
import reducer from "./contactReducer";
const ContactState = ({ children }) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: "Basit",
        phone: "111-222-111",
        email: "basit@gmail.com",
        relationship: "professional",
      },
      {
        id: 2,
        name: "Kashan",
        phone: "111-211-111",
        email: "kashan@gmail.com",
        relationship: "professional",
      },
      {
        id: 3,
        name: "Asil",
        phone: "000-222-111",
        email: "asil@gmail.com",
        relationship: "personal",
      },
    ],
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  // Add Contact
  const addContact = (data) => {
    dispatch({
      type: "ADD_CONTACT",
      payload: data,
    });
  };

  const updateContact = (data) => {
    dispatch({
      type: "UPDATE_CONTACT",
      payload: data,
    });
  };
  const deleteContact = (id) => {
    dispatch({
      type: "DELETE_CONTACT",
      payload: id,
    });
  };
  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        addContact,
        updateContact,
        deleteContact,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

const useContact = () => useContext(ContactContext);
export { ContactState, useContact };
