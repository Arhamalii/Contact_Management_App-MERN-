import axios from "axios";
import React, { useContext, useReducer } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import ContactContext from "./context";
import reducer from "./reducer";

const ContactState = ({ children }) => {
  const initialState = {
    contacts: [],
    editId: null,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  // action creaters

  const setContacts = async () => {
    try {
      const res = await axios.get("/api/contacts");
      if (res.data.succeess) {
        console.warn(
          "🚀 ~ file: state.js:15 ~ setContacts ~ res.data:",
          res.data.allContacts
        );
        dispatch({
          type: "SET_CONTACT",
          payload: res.data.allContacts,
        });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const updateCoantact = async (payload, id) => {
    try {
      const res = await axios.put(`/api/contacts/${id}`, payload);
      if (res.data.succeess) {
        setContacts();
        Swal.fire({
          title: "Upadted!",
          text: "Contact has been upadted.",
          icon: "success",
          confirmButtonColor: "#384152",
        });
        updateIdRemover();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const updateIdSetter = async (id) => {
    dispatch({
      type: "SET_CONTACT_ID",
      payload: id,
    });
  };

  const updateIdRemover = () => {
    dispatch({
      type: "REMOVE_CONTACT_ID",
    });
  };
  const deleteConatact = async (id) => {
    try {
      const res = await axios.delete(`/api/contacts/${id}`);
      if (res.data.success) {
        setContacts();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const createContact = async (payload) => {
    try {
      const res = await axios.post("/api/contacts", payload);
      if (res.data.success) {
        toast.success(res.data.message);
        setContacts();
        return true;
      }
    } catch (error) {
      toast.error(error.response.data.message);
      return false;
    }
  };
  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        editId: state.editId,
        setContacts,
        createContact,
        updateCoantact,
        deleteConatact,
        updateIdSetter,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

const useContact = () => useContext(ContactContext);
export { ContactState, useContact };