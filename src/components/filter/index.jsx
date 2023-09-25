const Filter = () => {
	return (
		<form>
			<div className="toggle">
				<label htmlFor="options">
					<input
						type="checkbox"
						name="options"
						id="options"
						defaultChecked={false}
					/>{" "}
					Customize
				</label>
			</div>

			<div className="controllers">
				<div className="form-group">
					<label htmlFor="type">Type:</label>
					<select name="type" id="type">
						<option value="education">Education</option>
						<option value="entertainment">Entertianment</option>
					</select>
				</div>

				<div className="form-group">
					<label className="form-control" htmlFor="accesibility">
						Accessiblity:
					</label>
					<div className="form-group">
						<input
							type="range"
							name="accesibility"
							id="accesibility"
							defaultValue={0}
							min={0}
							max={10}
						/>
						<span>4</span>
					</div>
				</div>
				<div className="form-group">
					<label htmlFor="participants">Participants:</label>
					<input
						type="number"
						name="participants"
						id="participants"
						defaultValue={1}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="price">Price </label>
					<div className="form-group">
						<input
							type="range"
							name="price"
							id="price"
							defaultValue={0}
							max={10}
							min={0}
						/>
						<span>5</span>
					</div>
				</div>
			</div>
		</form>
	);
};

export default Filter;
