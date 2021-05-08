function Button({ name, onClickHandler, type }) {
  return (
    <button
      onClick={() => {
        onClickHandler(type);
      }}
    >
      {name}
    </button>
  );
}

export default Button;
