from http.server import HTTPServer, BaseHTTPRequestHandler
from tasks import TaskStore
from form_urlencoded import get_POST_data

task_store = TaskStore()

class TaskHandler(BaseHTTPRequestHandler):
   def send_msg(self, status_code, message):
      self.send_response(status_code)
      self.end_headers()
      self.wfile.write((message + "\n").encode())

   def do_GET(self):
      if self.path == "/":
         self.send_msg(200, "Showing All Tasks\n" + str(task_store.tasks) + "\n")
      elif self.path.startswith("/task/"):
         task_id = int(self.path.split('/')[-1])
         task = task_store.get_task(task_id)
         if task:
            self.send_msg(200, "Showing Task: " + str(task) + "\n")
         else:
            self.send_msg(404, "Task Id " + str(task_id) + " Not Found\n")

   def do_POST(self):
      if self.path == "/task":
         data = get_POST_data(self)
         name = data["name"]
         due_date = data["due_date"] if "due_date" in data else None
         task_to_create = task_store.create_task(name, due_date)
         self.send_msg(201, "Task Created\n" + str(task_to_create) + "\n")

   def do_DELETE(self):
      task_id = int(self.path.split('/')[-1])
      if self.path.startswith("/task/"):
         task_store.delete_task(task_id)
         self.send_msg(200, "Task Id " + str(task_id) + " Deleted")
      else:
         self.send_msg(404, "Task "+ str(task_id) + " Not Found")

address = ("localhost", 8080)
server = HTTPServer(address, TaskHandler)

print(f"Server listening as http://{address[0]}:{address[1]}...")
server.serve_forever()
