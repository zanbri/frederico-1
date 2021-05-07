function Button({ name, onClickHandler, type }) {
  return (
    <button
      // className="filter-btn"
      onClick={() => {
        onClickHandler(type);
      }}
    >
      {name}
    </button>
  );
}

export default Button;
