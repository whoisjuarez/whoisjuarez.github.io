export const FILTERS = {
	All: () => true,
	Active: (task) => !task.completed,
	Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTERS);

export default function Filter({ filter, setFilter }) {
	const filterList = FILTER_NAMES.map((name) =>(
		<button
			type="button"
			className={`btn filter-btn ${name === filter ? 'isActive' : ''}`}
			aria-pressed={name === filter}
			onClick={() => setFilter(name)}
			key={name}>
				{name}
		</button>
	));

	return (
		<div className="btn-group">
			{filterList}
		</div>
	);
}