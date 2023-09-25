import { useReducer, useState } from "react";

import Button from "./components/button";
import Filter from "./components/filter";
import Toggle from "./components/filter/toggle";
import Message from "./components/message";
import axios from "axios";

import "./App.css";

const BASE_API = "https://www.boredapi.com/api/activity/";

document.title = "Don't Get Bored";

const initialState = {
	activity: "Welcome",
	accessibility: 0.25,
	type: "education",
	participants: 1,
	price: 0.1,
	link: "https://expressjs.com/",
	key: "0",
};

const initialQuery = {
	type: "education",
	accessibility: 0,
	participants: 1,
	price: 0,
};

const useFetchReducer = (state, action) => {
	switch (action.type) {
		case "FETCH_INIT":
			return { ...state, isLoading: true, isError: false };
		case "FETCH_ERROR":
			return { ...state, isLoading: false, isError: true };
		case "FETCH_SUCCESS":
			return {
				...state,
				data: action.payload,
				isLoading: false,
				isError: false,
			};
		case "NOTHING_NEW":
			return {
				...state,
				isLoading: false,
				isError: false,
				data: {
					error: "Nothing New In this category or You have visited everything",
				},
			};
		default:
			return;
	}
};

function App() {
	const [showFilter, setShowFilter] = useState(false);
	const [visited, setVisited] = useState([]);
	const [formData, setFormData] = useState(initialQuery);
	const [message, dispatchMessage] = useReducer(useFetchReducer, {
		data: initialState,
		isLoading: false,
		isError: false,
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		let finalUrl = "";
		if (showFilter) {
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
			<header className="header">
				<h1 className="header__title">Enjoy</h1>
			</header>

			<main className="content">
				<div className="container row">
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
		</>
	);
}

export default App;
