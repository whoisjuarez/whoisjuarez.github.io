export default function EditingTask ({ 
	showTask, 
	newTaskName, 
	handleChange, 
	handleSubmit, 
	setIsEditing,
}) {
	return (
		<form className="todo-individual" onSubmit={handleSubmit}>
			<div className="edit-form">
				<input 
					id={showTask.id}
					type="text"
					value={newTaskName}
					onChange={handleChange} />
			</div>

			<div className="btn-group">
				<button 
					type="button" 
					className="btn cancel-edit"
					onClick = {() => setIsEditing(false)}>
					Cancel
				</button>
				
				<button 
					type="submit" 
					className="btn save-edit">
					Save
				</button>
			</div>
		</form>
	);
}