/**
 * Logout
 */
const logoutBtn = document.querySelector(".logout_btn");
logoutBtn.addEventListener("click", logout);

function logout(e) {
  e.preventDefault();
  fetch("app/todo_v2_db_logout.php", {
    method: "POST",
  })
    .then((response) => {
      if (response.ok) {
        window.location.href = "index.html";
      } else {
        console.error("Logout failed");
      }
    })
    .catch((error) => {
      console.error("Logout error:", error);
    });
}
