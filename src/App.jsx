import { useEffect, useReducer, useRef, useState } from "react";
import "./App.css";
import Button from "./components/button";
import Filter from "./components/filter";
import Toggle from "./components/filter/toggle";
import Message from "./components/message";

const BASE_API = "http://www.boredapi.com/api/activity/";

const initialState = {
	activity: "Learn Express.js",
	accessibility: 0.25,
	type: "education",
	participants: 1,
	price: 0.1,
	link: "https://expressjs.com/",
	key: "3943506",
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
			return { ...state, isLoading: true, isEror: false };
		case "FETCH_ERROR":
			return { ...state, isLoading: false, isError: true };
		case "FETCH_SUCCESS":
			return {
				...state,
				data: action.payload,
				isLoading: false,
				isEror: false,
			};
		default:
			return;
	}
};

function App() {
	const [showFilter, setShowFilter] = useState(false);
	const [url, setUrl] = useState(BASE_API);
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
			console.log(formData);
			const { type, participants, accessibility, price } = formData;
			const result = `?type=${type}&participants=${participants}&accessibility=${
				accessibility / 10
			}&price=${price / 10}`;
			finalUrl = `${BASE_API}?${result}`;
		} else {
			finalUrl = BASE_API;
		}

		handleSearch(finalUrl);
	};

	const handleSearch = (finalUrl) => {
		dispatchMessage({ type: "FETCH_INIT" });
	};

	useEffect(() => {}, [showFilter, url, formData]);

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
		</>
	);
}

export default App;
