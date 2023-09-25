import PropTypes from "prop-types";
import "./toggle.css";

const Toggle = ({ value, toggle }) => {
	const handleToggle = () => {
		toggle(!value);
	};

	return (
		<div className="toggle">
			<label htmlFor="options">
				<input
					type="checkbox"
					name="options"
					id="options"
					checked={value}
					value={value}
					onChange={handleToggle}
				/>{" "}
				Customize
			</label>
		</div>
	);
};

Toggle.propTypes = {
	value: PropTypes.bool,
	toggle: PropTypes.func,
};

export default Toggle;
