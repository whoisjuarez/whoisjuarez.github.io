"""
Module of a HTTP server for managing tasks.

The server supports GET, POST, and DELETE requests.
"""
from http.server import HTTPServer, BaseHTTPRequestHandler
from tasks import TaskStore
from form_urlencoded import get_POST_data

task_store = TaskStore()

class TaskHandler(BaseHTTPRequestHandler):
    """
    A request handler for a HTTP server that manages tasks.

    This handler supports GET, POST, and DELETE requests.
    """
    def send_msg(self, status_code, message):
        """
        Send a HTTP response with the given status code and message.

        Args:
            status_code (int): The HTTP status code for the response.
            message (str): The message to include in the response body.
        """
        self.send_response(status_code)
        self.end_headers()
        self.wfile.write((message + "\n").encode())

    def do_GET(self):
        """
        Handle a GET request by responding with the list of tasks or a specific task.

        If the path is '/', respond with the list of tasks.
        If the path starts with '/task/', respond with the task with the given ID.
        """
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
        """
        Handle a POST request by creating a new task.

        If the path is '/task', create a new task with the given name and due date.
        """
        if self.path == "/task":
            data = get_POST_data(self)
            name = data["name"]
            due_date = data["due_date"] if "due_date" in data else None
            task_to_create = task_store.create_task(name, due_date)
            self.send_msg(201, "Task Created\n" + str(task_to_create) + "\n")

    def do_DELETE(self):
        """
        Handle a DELETE request by deleting a task.

        If the path starts with '/task/', delete the task with the given ID.
        """
        if self.path == "/":
            self.send_msg(405, "Method Not Allowed")
            return
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
