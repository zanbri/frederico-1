import { useReducer, useContext, createContext } from "react";

const AppStateContext = createContext();
const AppDispatchContext = createContext();

const reducer = (state, action) => {
  console.log(state);
  switch (action.type) {
    case "OPEN_PROJ":
      return { ...state, proj_ids: state.proj_ids.add(action.payload) };
    case "CLOSE_PROJ":
      const new_state = { ...state };
      new_state.proj_ids.delete(action.payload);
      return new_state;
    case "CLEAR_PROJS":
      return { ...state, proj_ids: new Set([]) };
    case "SORT":
      return { ...state, sort_by: action.payload };
    case "FILTER":
      return { ...state, filter_by: action.payload };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const AppContextProvider = ({ children }) => {
  const initState = {
    proj_ids: new Set(),
    sort_by: "year",
    filter_by: "all",
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
export const useDispatchAppState = () => useContext(AppDispatchContext);
