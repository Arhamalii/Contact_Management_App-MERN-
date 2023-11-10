const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CONTACT":
      return { ...state, contacts: action.payload };
    case "SET_CONTACT_ID":
      return { ...state, editId: action.payload };
    case "REMOVE_CONTACT_ID":
      return { ...state, editId: null };

    default:
      return state;
  }
};

export default reducer;
