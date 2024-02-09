class TaskStore:
   def __init__(self):
      self.tasks = []
      self.counter = 1

   def create_task(self, name, due_date=None):
      new_task = {"id": self.counter, "name": name, "due_date": due_date}
      self.tasks.append(new_task)
      self.counter += 1
      return new_task

   def get_task(self, id):
      for task in self.tasks:
         if task["id"] == id:
            return task
      
   def delete_task(self, id):
      task_to_delete = self.get_task(id)
      self.tasks.remove(task_to_delete)
      print(f"Task {id} deleted")
