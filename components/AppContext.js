import { useReducer, useContext, createContext } from "react";
import { useRouter } from "next/router";

const AppStateContext = createContext();
const AppDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "LOAD_PROJS":
      console.log("Loading projs: ", action.payload);
      return { ...state, projs: action.payload };
    case "OPEN_PROJ":
      console.log("Opening proj: ", action.payload);
      return {
        ...state,
        proj_ids: state.proj_ids.add(action.payload),
        active_id: action.payload,
      };
    case "CLOSE_PROJ":
      console.log("Closing proj: ", action.payload);
      const new_state = { ...state };
      new_state.proj_ids.delete(action.payload);
      return new_state;
    case "ACTIVE_ID":
      console.log("Setting active id to: ", action.payload);
      return { ...state, active_id: action.payload, maximized_id: null };
    case "MAXIMIZE":
      console.log("Setting maximized id to: ", action.payload);
      return { ...state, maximized_id: action.payload };
    case "CLEAR_PROJS":
      console.log("Clearing projects: ");
      return { ...state, proj_ids: new Set([]), active_id: null };
    case "SORT":
      console.log("Setting sort to: ", action.payload);
      return { ...state, sort_by: action.payload };
    case "LANG":
      console.log("Setting lang to: ", action.payload);
      return { ...state, lang: action.payload };
    case "FILTER":
      console.log("Setting filter to: ", action.payload);
      return { ...state, filter_by: action.payload };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const AppContextProvider = ({ children }) => {
  const initState = {
    projs: [],
    proj_ids: new Set(),
    sort_by: "year",
    filter_by: "all",
    active_id: null,
    maximized_id: null,
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

// Read state with useAppState
export const useAppState = () => useContext(AppStateContext);

// Update state with useDispatchAppState
export const useDispatchAppState = () => useContext(AppDispatchContext);
