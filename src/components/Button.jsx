import PropTypes from "prop-types";
const Button = (props) => {
  return (
    <button
      className={`bg-zinc-600 px-6 py-3 rounded text-white ${props.className}`}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
};

Button.propTypes = {
  value: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default Button;
