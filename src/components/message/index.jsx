import PropTypes from "prop-types";
const Message = ({ data }) => {
	return <p>{data.activity}</p>;
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
	}),
};

export default Message;
