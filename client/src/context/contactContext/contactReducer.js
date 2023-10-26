const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_CONTACT":
      return { ...state, contacts: [action.payload, ...state.contacts] };

    case "UPDATE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.map((data) => {
          if (data.id === action.payload.id) {
            return action.payload;
          }
          return data;
        }),
      };

    case "DELETE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter((d) => {
          return d.id !== action.payload;
        }),
      };

    default:
      return state;
  }
};

export default reducer;
