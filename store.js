import { createContext, FC, useContext, useReducer } from "react";

export const initialState = {
  user: {},
  sessionId: undefined,
};

// interface State {
//   user: {
//     uid?: string;
//     name?: string;
//   };
//   sessionId?: string;
// }

// interface Action {
//   type: string;
//   user?: State["user"];
//   sessionId?: string;
// }

// type Reducer = (_state: State, _action: Action) => State;

// interface Props {
//   children: JSX.Element;
// }

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.user };
    case "SET_SESSION":
      return { ...state, sessionId: action.sessionId };
    default:
      return state;
  }
};

const StoreContext = createContext(initialState);

export const StoreProvider = ({ children }) => {
  return (
    <StoreContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStoreValue = () => useContext(StoreContext);
