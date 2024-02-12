"""
Tasks module for managing tasks.
"""

class TaskStore:
    """
    A class for managing tasks.

    This class stores tasks in a list of dictionaries.
    Each dictionary has an 'id', 'name', and 'due_date' field.
    """
    def __init__(self):
        """
        Initialize the TaskStore class.
        """
        self.tasks = []
        self.counter = 1

    def create_task(self, name, due_date=None):
        """
        Create a new task.

        Args:
            name (str): The name of the task.
            due_date (str): The due date of the task.

        Returns:
            dictionary: The newly created task.
        """
        new_task = {"id": self.counter, "name": name, "due_date": due_date}
        self.tasks.append(new_task)
        self.counter += 1
        return new_task

    def get_task(self, task_id):
        """
        Get a task by its ID.

        Args:
            task_id (int): The ID of the task.

        Returns:
            dictionary: The task with the given ID, or None if not found.
        """
        for task in self.tasks:
            if task["task_id"] == task_id:
                return task
        return None

    def delete_task(self, task_id):
        """
        Delete a task by its ID.

        Args:
            task_id (int): The ID of the task to delete.
        """
        task_to_delete = self.get_task(task_id)
        self.tasks.remove(task_to_delete)
        print(f"Task {task_id} deleted")
