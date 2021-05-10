import { useAppState } from "./AppContext";

function Button({ name, onClickHandler, type }) {
  const appState = useAppState();
  console.log(appState.sort_by);

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
