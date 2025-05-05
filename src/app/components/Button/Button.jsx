const Button = ({ text, onClick, disabled = false, variant = "primary" }) => {
  return (
    <button
      className={`button button--${variant} ${disabled ? "button--disabled" : ""
        }`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
