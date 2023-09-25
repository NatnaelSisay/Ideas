import { useEffect, useRef, useState } from "react";
import "./App.css";
import Button from "./components/button";
import Filter from "./components/filter";
import Toggle from "./components/filter/toggle";
import Message from "./components/message";

function App() {
	const [showFilter, setShowFilter] = useState(false);
	const [url, setUrl] = useState("without filter");
	const formData = useRef({});

	const handleSubmit = (e) => {
		e.preventDefault();

		if (showFilter) {
			const [type, accesibility, participants, price] = formData.current;
			setUrl("url with filter");
		} else {
			setUrl("without filter");
		}
		console.log(url);
	};

	return (
		<>
			<header className="header">
				<h1 className="header__title">Enjoy</h1>
			</header>

			<main className="content">
				<div className="container row">
					<div className="content__message">
						<Message />
					</div>

					<div className="content__controler">
						<Toggle value={showFilter} toggle={setShowFilter} />
						{showFilter && (
							<Filter submit={handleSubmit} filterInfo={formData} />
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
