import { useAppState } from "./AppContext";

function Button({ name, onClickHandler, type }) {
  const appState = useAppState();

  return (
    <button
      className={`btn ${appState.sort_by === type && "active"} `}
      onClick={() => {
        onClickHandler(type);
      }}
    >
      {name}
    </button>
  );
}

export default Button;
