import { useState } from "react";
import Form from "./AddForm";
import Filter, {FILTERS} from "./Filter";
import TodoList from "./Todo";
import { nanoid } from "nanoid";
// I've tried to replace nanoid with crypto.randomUUID 
// but I got this error: Module "crypto" has been externalized for browser compatibility. Cannot access "crypto.randomUUID" in client code. 
// So I kept nanoid, since i've already installed it with npm.

export default function App(list) {
	const [tasks, setTasks] = useState(list.tasks);
	const [filter, setFilter] = useState("All");

	function onTaskAdd(name) {
		const newTask = {id:"task-" + nanoid(), name, completed:false};
		setTasks(tasks.concat(newTask));
	}

	function onTaskComplete(id) {
		const updatedTasks = tasks.map((task) => {
			if (id === task.id) {
				return Object.assign({}, task, {completed: !task.completed});
			}
			return task;
		});
		setTasks(updatedTasks);
	}

	function onTaskEdit(id, newTaskName){
		const editTaskList = tasks.map((task) => {
			if (id === task.id){
				return Object.assign({}, task, {name: newTaskName});
			}
			return task;
		});
		setTasks(editTaskList);
	}

	function onTaskDelete(id) {
		const tasksLeft = tasks.filter((task) => id !== task.id);
		setTasks(tasksLeft);
	}

	const taskList = tasks.filter(FILTERS[filter]).map((task) => (
		<TodoList 
			id={task.id} 
			name={task.name}
			completed={task.completed}
			key={task.id}
			handleTaskComplete={onTaskComplete}
			handleTaskEdit={onTaskEdit}
			handleTaskDelete={onTaskDelete} />
	));

	// Count tasks
	const countTasksNoun = taskList.length !== 1 ? "things" : "thing";
	const countTasks = taskList.length + " " + countTasksNoun + " to do";

	return (
		<main className="todo-container container">
			<h1>Maybe Later?</h1>
			<h2>v3 - Now on React</h2>

			<Form handleTaskAdd={onTaskAdd}/>

			<Filter filter={filter} setFilter={setFilter} />
			
			<h3>{countTasks}</h3>
			
			<ul className="todo-container">
				<li>{taskList}</li>
			</ul>
		</main>
	);
}
