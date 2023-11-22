import axios from "axios";
import React, { useContext, useReducer } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import ContactContext from "./context";
import reducer from "./reducer";

const ContactState = ({ children }) => {
  const initialState = {
    contacts: [
      {
        name: "Arham",
        relation: "personal",
        phone: "03250804785",
        id: 1,
      },
      {
        name: "Arham",
        relation: "personal",
        phone: "03250804785",
        id: 1,
      },
      {
        name: "Baghi",
        relation: "personal",
        phone: "03250804785",
        id: 1,
      },
      {
        name: "Shafwew",
        relation: "personal",
        phone: "03250804785",
        id: 1,
      },
      {
        name: "Zubado",
        relation: "personal",
        phone: "03250804785",
        id: 1,
      },
    ],
    updateContactState: null,
    relation: {
      personal: null,
      professional: null,
    },
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  // action creaters

  const setContacts = async (checkFilters, defaultFilter) => {
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

        setRelContacts();
        if (defaultFilter) {
          localStorage.setItem("filter", "all");
        }
        if (checkFilters) {
          const prevFilter = localStorage.getItem("filter");
          if (!prevFilter) {
            localStorage.setItem("filter", "all");
          }
          prevFilter === "personal" && filterPersonal(true);
          prevFilter === "professional" && filterProfessional(true);
        }
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const updateCoantact = async (payload, id) => {
    try {
      const res = await axios.put(`/api/contacts/${id}`, payload);
      if (res.data.succeess) {
        setContacts(true);
        Swal.fire({
          title: "Upadted!",
          text: "Contact has been upadted.",
          icon: "success",
          confirmButtonColor: "#384152",
        });
        updateCoantactRemover();
        return true;
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const updateConatctSetter = async (id) => {
    dispatch({
      type: "SET_UPDATE_CONTACT",
      payload: id,
    });
  };
  const updateCoantactRemover = () => {
    dispatch({
      type: "REMOVE_UPDATE_CONTACT",
    });
  };
  const deleteConatact = async (id) => {
    try {
      const res = await axios.delete(`/api/contacts/${id}`);
      if (res.data.success) {
        setContacts(true);
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
        setContacts(true);
        return true;
      }
    } catch (error) {
      toast.error(error.response.data.message);
      return false;
    }
  };

  const setRelContacts = () => {
    dispatch({
      type: "SET_RELATION_CONTACT",
    });
  };

  // filter conatcts actions

  const filterPersonal = async (resposne) => {
    if (!resposne) {
      await setContacts();
    }
    dispatch({
      type: "SET_FILTER_CONTACT-1",
    });
  };
  const filterProfessional = async (resposne) => {
    if (!resposne) {
      await setContacts();
    }
    dispatch({
      type: "SET_FILTER_CONTACT-2",
    });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        updateContactState: state.updateContactState,
        relation: state.relation,
        setContacts,
        createContact,
        updateCoantact,
        deleteConatact,
        updateConatctSetter,
        updateCoantactRemover,
        filterPersonal,
        filterProfessional,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

const useContact = () => useContext(ContactContext);
export { ContactState, useContact };
