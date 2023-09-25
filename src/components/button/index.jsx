const Button = ({ type = "button", children, ...rest }) => {
	return (
		<button type={type} className="btn" {...rest}>
			{children}
		</button>
	);
};

export default Button;
