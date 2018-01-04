export const types = {
    FETCH_REQUEST: "USERSLIST/FETCH_REQUEST",
    DELETE_REQUEST: "USERSLIST/DELETE_REQUEST",
    ITEMS: "USERSLIST/ITEMS",
    MESSAGE: "USERSLIST/MESSAGE",
    TOKEN: "USERSLIST/TOKEN"
  };


  // Reducer
  const initialState = {
    items: [],
    loading: false,
    error: false,
    message:''
  };
  export default  (state = initialState, action) => {
    switch (action.type) {
        case types.ITEMS:
          return { ...state, items: action.items };
      default:
        return state;
    }
  };

  // Action Creators
  export const actions = {
    getUsersList: (payload) => ({ type: types.FETCH_REQUEST, payload}),
    deleteUser: (payload) => ({ type: types.DELETE_REQUEST, payload}),
  };
