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

    default:
      return state;
  }
};

export default reducer;
