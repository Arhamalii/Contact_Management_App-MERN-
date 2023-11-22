const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CONTACT":
      return { ...state, contacts: action.payload };
    case "SET_CONTACT_ID":
      return { ...state, editId: action.payload };
    case "REMOVE_CONTACT_ID":
      return { ...state, editId: null };
    case "SET_UPDATE_CONTACT":
      const filteredContact = state.contacts.filter(
        (d) => d._id === action.payload
      );
      return { ...state, updateContactState: filteredContact[0] };
    case "REMOVE_UPDATE_CONTACT":
      return { ...state, updateContactState: null };

    case "SET_RELATION_CONTACT":
      const professionalContacts = state.contacts.filter(
        (d) => d.relation === "professional"
      );
      const personalContacts = state.contacts.filter(
        (d) => d.relation === "personal"
      );
      return {
        ...state,
        relation: {
          personal: personalContacts,
          professional: professionalContacts,
        },
      };
    case "SET_FILTER_CONTACT-1":
      localStorage.setItem("filter", "personal");
      const personalContactsFiltered = state.contacts.filter(
        (d) => d.relation === "personal"
      );
      return { ...state, contacts: personalContactsFiltered };

    case "SET_FILTER_CONTACT-2":
      localStorage.setItem("filter", "professional");
      const professionalContactsFiltered = state.contacts.filter(
        (d) => d.relation === "professional"
      );
      return { ...state, contacts: professionalContactsFiltered };

    default:
      return state;
  }
};

export default reducer;
