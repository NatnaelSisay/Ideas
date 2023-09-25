import "./App.css";
import Button from "./components/button";
import Filter from "./components/filter";
import Message from "./components/message";

function App() {
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
						<Filter />
						<Button>Explore</Button>
					</div>
				</div>
			</main>
		</>
	);
}

export default App;
