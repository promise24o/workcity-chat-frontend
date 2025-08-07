// src/context/StateProvider.jsx
import { createContext, useEffect, useReducer } from "react";
import { initialState } from "./initialState";
import reducer from "./reducer";

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      dispatch({
        type: "SET_USER",
        payload: { user: JSON.parse(user), token },
      });
    }
  }, []);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};
