import PropTypes from "prop-types";
import "./index.css";

const Button = ({ type = "button", children, ...rest }) => {
	return (
		<button type={type} className="btn" {...rest}>
			{children}
		</button>
	);
};

Button.propTypes = {
	type: PropTypes.string,
	children: PropTypes.string,
};

export default Button;
