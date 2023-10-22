import { useReducer, useState } from "react";
import useFetchReducer from "../../hooks";

import axios from "axios";

import Button from "../../components/button";
import Filter from "../../components/board/filter";
import Toggle from "../../components/board/filter/toggle";
import Message from "../../components/message";

import "./index.css";

import { BASE_API } from "../../constants/api";

function Home() {
	const [showFilter, setShowFilter] = useState(false);
	const [visited, setVisited] = useState([]);
	const [formData, setFormData] = useState({});
	const [message, dispatchMessage] = useReducer(useFetchReducer, {
		data: {},
		isLoading: false,
		isError: false,
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		let finalUrl = "";
		if (showFilter && Object.keys(formData).length !== 0) {
			const { type, participants, accessibility, price } = formData;
			const result = `type=${type}&participants=${participants}&accessibility=${
				accessibility / 10
			}&price=${price / 10}`;
			finalUrl = `${BASE_API}?${result}`;
		} else {
			finalUrl = BASE_API;
		}

		handleSearch(finalUrl);
	};

	const handleSearch = async (finalUrl) => {
		dispatchMessage({ type: "FETCH_INIT" });
		try {
			let trials = 0;
			let result = await axios.get(finalUrl);

			while (visited.includes(result.data.key) && trials < 10) {
				result = await axios.get(finalUrl);
				trials++;
			}

			if (visited.includes(result.data.key)) {
				return dispatchMessage({ type: "NOTHING_NEW", payload: result.data });
			}

			setVisited([...visited, result.data.key]);
			dispatchMessage({ type: "FETCH_SUCCESS", payload: result.data });
		} catch {
			dispatchMessage({ type: "FETCH_ERROR" });
		}
	};

	return (
		<>
			<div className="bored-card">
				<main className="content">
					<div className="container row card">
						<div className="content__message">
							{message.isError && <p>Error!</p>}
							{message.isLoading && <p>Loading...</p>}
							{!(message.isLoading || message.isError) && (
								<Message data={message.data} />
							)}
						</div>
						<div className="content__controler">
							<Toggle value={showFilter} toggle={setShowFilter} />
							{showFilter && (
								<Filter submit={handleSubmit} setData={setFormData} />
							)}
							<Button type="submit" onClick={handleSubmit}>
								Explore
							</Button>
						</div>
					</div>
				</main>

				<div className="container center">
					<a
						className="link"
						target="_blank"
						rel="noreferrer"
						href="https://www.linkedin.com/in/natnael-kagnaw/"
					>
						Natnael Kagnaw - LinkedIn
					</a>
				</div>
			</div>
		</>
	);
}

export default Home;
