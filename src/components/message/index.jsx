import PropTypes from "prop-types";

import "./index.css";

const Message = ({ data }) => {
	return (
		<div>
			{data.error && <p className="error">{data.error}</p>}
			{!data.error && <p className="activity">{data.activity}</p>}
		</div>
	);
};

Message.propTypes = {
	data: PropTypes.shape({
		activity: PropTypes.string,
		accessibility: PropTypes.number,
		type: PropTypes.string,
		participants: PropTypes.number,
		price: PropTypes.number,
		link: PropTypes.string,
		key: PropTypes.string,
		error: PropTypes.string,
	}),
};

export default Message;
