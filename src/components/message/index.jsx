import PropTypes from "prop-types";

import "./index.css";

const Message = ({ data }) => {
	return (
		<div>
			{data.error && <ErrorComponent message={data.error} />}
			{!data.error && <p className="activity">{data.activity}</p>}
		</div>
	);
};

const ErrorComponent = ({ message }) => {
	return (
		<div>
			<p>{message}</p>

			<p>
				<a
					target="_blank"
					rel="noopener noreferrer"
					href="https://www.boredapi.com/contributing"
				>
					Contribute
				</a>
			</p>
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
		nothingNew: PropTypes.string,
	}),
};

ErrorComponent.propTypes = {
	message: PropTypes.string,
};

export default Message;
