import { createContext, useContext, useReducer } from "react";

export const StoreContext = createContext();

export const StoreProvider = ({ reducer, initialState, children }) => (
  <StoreContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StoreContext.Provider>
);

export const useStoreValue = () => useContext(StoreContext);

export const initialState = {
  user: {},
  sessionId: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.user };
    default:
      return state;
  }
}

export default reducer;
