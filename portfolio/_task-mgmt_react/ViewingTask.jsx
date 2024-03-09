export default function ViewingTask ({
	showTask,
	startEditing,
}) {
	return (
		<div className="todo-individual">
			<div className="task-solo">
				<label htmlFor={showTask.id}>
					{showTask.name}
				</label>
			</div>

			<div className="btn-group">
				<input
					id={showTask.id}
					type="checkbox"
					defaultChecked={showTask.completed}
					onChange={() => showTask.handleTaskComplete(showTask.id)} />

				<label htmlFor={showTask.id}></label>

				<button 
					type="button" 
					className="btn btn_edit"
					onClick = {startEditing}>
					Edit 
				</button>

				<button
					type="button"
					className="btn btn_delete"
					onClick={() => showTask.handleTaskDelete(showTask.id)}>
					Delete 
				</button>
			</div>
		</div>
	);
}