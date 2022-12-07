import { createContext, useContext, useReducer } from "react";

export const initialState = {
  user: {},
  sessionId: undefined,
  dealer: {
    uid: "",
    name: "",
  },
  wordInPlay: "",
  players: {},
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
    case "SET_DEALER":
      return { ...state, dealer: action.dealer };
    case "SET_GAMEPLAY":
      return { ...state, dealer: action.dealer, players: action.players };
    case "SET_WORD_IN_PLAY":
      return { ...state, wordInPlay: action.wordInPlay };
    case "SET_MARRY_WORDS":
      return { ...state, marryWords: action.marryWords };
    case "SET_TURN":
      return { ...state, myTurn: action.myTurn };
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
