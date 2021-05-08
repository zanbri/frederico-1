import { useReducer, useContext, createContext } from "react";

const AppStateContext = createContext();
const AppDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "OPEN_PROJ":
      return state.projs.add(action.proj);
    case "CLOSE_PROJ":
      return state.projs.delete(action.proj);
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const AppContextProvider = ({ children }) => {
  const initState = {
    projs: new Set(),
  };
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <AppDispatchContext.Provider value={dispatch}>
      <AppStateContext.Provider value={state}>
        {children}
      </AppStateContext.Provider>
    </AppDispatchContext.Provider>
  );
};

export const useAppState = () => useContext(AppStateContext);
export const useDispatchApp = () => useContext(AppDispatchContext);
