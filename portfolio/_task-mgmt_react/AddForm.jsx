import { useState } from "react";

export default function Form(addForm) {
	const [taskName, setTaskName] = useState("");

	function handleChange(e) {
		setTaskName(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();
		if (taskName.trim() !== "") {
			addForm.handleTaskAdd(taskName)
			setTaskName("");
		}
	}

	return(
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				id="new-todo-input"
				className="input_add"
				name="text"
				autoComplete="off"
				placeholder="Enter an activity"
				value={taskName}
				onChange={handleChange} />

			<button type="submit" className="btn btn_add">
				Add
			</button>
		</form>
	)
}