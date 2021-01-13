import PropTypes from 'prop-types';

const Button = ({ onClick, children }) => {
  return (
    <button type="button" className="Button" onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
