import { useState } from "react";
import EditingTask from "./EditingTask";
import ViewingTask from "./ViewingTask";

export default function TodoList(showTask) {
	const [isEditing, setIsEditing] = useState(false);
	const [newTaskName, setNewTaskName] = useState("");

	function startEditing() {
		setIsEditing(true);
		setNewTaskName(showTask.name);
	}

	function handleChange(e) {
		setNewTaskName(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();
		showTask.handleTaskEdit(showTask.id, newTaskName);
		setIsEditing(false);
	}

	let taskComponent;
	if (isEditing) {
		taskComponent = (
			<EditingTask
				showTask={showTask}
				newTaskName={newTaskName}
				handleChange={handleChange}
				handleSubmit={handleSubmit}
				setIsEditing={setIsEditing}
				startEditing={startEditing} />
		);
	} else {
		taskComponent = (
			<ViewingTask
				showTask={showTask}
				setIsEditing={setIsEditing}
				startEditing={startEditing} />
		);
	}

	return (
		<>
			{taskComponent}
		</>
	);
}
