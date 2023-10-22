import { useEffect, useState } from "react";

import "./index.css";

import { ACTIVITY_TYPES } from "../../../constants/api";

const Filter = ({ setData, submit }) => {
	const [type, setType] = useState("education");
	const [accessibility, setAccessibility] = useState(0);
	const [participants, setParticipants] = useState(1);
	const [price, setPrice] = useState(0);

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
						onChange={(e) => setType(e.target.value)}
					>
						{ACTIVITY_TYPES.map((t) => (
							<option key={t} value={t}>
								{t}
							</option>
						))}
					</select>
				</div>

				<div className="form-group">
					<label
						className="form-control"
						htmlFor="accessibility"
						title="A factor describing how possible an event is to do with zero being the most accessible"
					>
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
							onChange={(e) => setAccessibility(e.target.value)}
						/>
						<span>{accessibility}</span>
					</div>
				</div>

				<div className="form-group">
					<label
						htmlFor="participants"
						title="The number of people that this activity could involve"
					>
						Participants:
					</label>
					<input
						type="number"
						name="participants"
						id="participants"
						value={participants}
						onChange={(e) => setParticipants(e.target.value)}
					/>
				</div>

				<div className="form-group">
					<label
						htmlFor="price"
						title="A factor describing the cost of the event with zero being free"
					>
						Price{" "}
					</label>
					<div className="form-group">
						<input
							type="range"
							name="price"
							id="price"
							max={10}
							min={0}
							value={price}
							onChange={(e) => setPrice(e.target.value)}
						/>
						<span>{price}</span>
					</div>
				</div>
			</div>
		</form>
	);
};

export default Filter;
