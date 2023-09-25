import { useEffect, useState } from "react";

const Filter = ({ setData, submit }) => {
	const types = [
		"education",
		"recreational",
		"social",
		"diy",
		"charity",
		"cooking",
		"relaxation",
		"music",
		"busywork",
	];

	const [type, setType] = useState("education");
	const [accessibility, setAccessibility] = useState(0);
	const [participants, setParticipants] = useState(1);
	const [price, setPrice] = useState(0);

	const handleStateChange = (e) => {
		if (e.target.id === "type") {
			setType(e.target.value);
		}
		if (e.target.id === "accessibility") {
			setAccessibility(e.target.value);
		}
		if (e.target.id === "participants") {
			setParticipants(e.target.value);
		}
		if (e.target.id === "price") {
			setPrice(e.target.value);
		}
	};

	useEffect(() => {
		const data = { type, accessibility, participants, price };
		setData(data);
	}, [type, accessibility, participants, price]);

	return (
		<form onSubmit={submit}>
			<div className="controllers">
				<div className="form-group">
					<label htmlFor="type">Type:</label>
					<select
						name="type"
						id="type"
						value={type}
						onChange={handleStateChange}
					>
						{types.map((t) => (
							<option key={t} value={t}>
								{t}
							</option>
						))}
					</select>
				</div>

				<div className="form-group">
					<label className="form-control" htmlFor="accessibility">
						Accessiblity:
					</label>
					<div className="form-group">
						<input
							type="range"
							name="accessibility"
							id="accessibility"
							min={0}
							max={10}
							value={accessibility}
							onChange={handleStateChange}
						/>
						<span>{accessibility}</span>
					</div>
				</div>

				<div className="form-group">
					<label htmlFor="participants">Participants:</label>
					<input
						type="number"
						name="participants"
						id="participants"
						value={participants}
						onChange={handleStateChange}
					/>
				</div>

				<div className="form-group">
					<label htmlFor="price">Price </label>
					<div className="form-group">
						<input
							type="range"
							name="price"
							id="price"
							max={10}
							min={0}
							value={price}
							onChange={handleStateChange}
						/>
						<span>{price}</span>
					</div>
				</div>
			</div>
		</form>
	);
};

export default Filter;
