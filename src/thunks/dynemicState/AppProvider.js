import React, { createContext, useContext, useEffect, useReducer } from "react";
import { loadState, removeState, saveState } from "./localStorageUtil";

const AppStateContext = createContext();
const AppDispatchContext = createContext();

const useThunkReducer = (reducer, initialState) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const enhancedDispatch = (action) => {
    if (typeof action === "function") {
      return action(dispatch);
    }
    return dispatch(action);
  };

  return [state, enhancedDispatch];
};

const AppProvider = ({ children, whitelist = [] }) => {
  const persistedState = loadState(whitelist);
  const initialState = { ...persistedState }; // Start with persisted state or empty object
  const [state, dispatch] = useThunkReducer(dynamicReducer, initialState);

  useEffect(() => {
    saveState(state, whitelist);
  }, [state, whitelist]);

  const removePersistedData = (keys) => {
    dispatch({ type: "REMOVE_STATE", key: keys });
    removeState(keys);
  };

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={{ dispatch, removePersistedData }}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};

const useAppState = () => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error("useAppState must be used within an AppProvider");
  }
  return context;
};

const useAppDispatch = () => {
  const context = useContext(AppDispatchContext);
  if (context === undefined) {
    throw new Error("useAppDispatch must be used within an AppProvider");
  }
  return context;
};

const dynamicReducer = (state, action) => {
  switch (action.type) {
    case "SET_STATE":
      return { ...state, [action.key]: action.payload };
    case "REMOVE_STATE":
      const newState = { ...state };
      delete newState[action.key];
      return newState;
    default:
      return state;
  }
};

export { AppProvider, useAppState, useAppDispatch };
