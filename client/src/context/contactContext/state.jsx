import axios from "axios";
import React, { useContext, useReducer } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import ContactContext from "./context";
import reducer from "./reducer";

const ContactState = ({ children }) => {
  const initialState = {
    contacts: [],
    updateContactState: null,
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
        // updateContactRemover();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const updateConatctSetter = async (id) => {
    // dispatch({
    //   type: "SET_CONTACT_ID",
    //   payload: id,
    // });
    dispatch({
      type: "SET_UPDATE_CONTACT",
      payload: id,
    });
  };
  // const updateContactRemover = () => {
  //   dispatch({
  //     type: "REMOVE_UPDATE_CONTACT",
  //   });
  // };

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
        updateContactState: state.updateContactState,
        setContacts,
        createContact,
        updateCoantact,
        deleteConatact,
        updateConatctSetter,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

const useContact = () => useContext(ContactContext);
export { ContactState, useContact };
