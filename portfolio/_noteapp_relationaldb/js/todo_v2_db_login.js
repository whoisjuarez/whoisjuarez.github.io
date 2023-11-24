// Check if logged in
const loginCheck = async () => {
   let url = 'app/todo_v2_db_login_check.php';
   const response = await fetch(url);
   const confirmation = await response.json();
   console.log(confirmation);

   if(!confirmation[0].verify) {
      console.log('not logged in');
   } else {
      console.log('yes logged in');
      window.location.href = 'todolist.html';
   }
}
loginCheck();


const doLoginForm = document.querySelector('#login-form');
doLoginForm.addEventListener('submit', async (e) => {
   e.preventDefault();

   let login = await verifyUser(doLoginForm.email.value, doLoginForm.password.value);
   // console.log(login);

   // Keep the success message as it is! It's related to the PHP file.
   if (login && login.success === 'Password successfully verified') {
      window.location.href = 'todolist.html';
   } else {
      console.log('Login object:', login);
      alert('Invalid email or password.');
   }
});

// Verify user
const verifyUser = async (email, password) => {
   // Create object with email and password fields
   const credentials = {
       email: email,
       password: password
   };

   // Convert object into JSON
   const data = JSON.stringify(credentials);

   let url = 'app/todo_v2_db_login.php';
   const response = await fetch(url, {
       method: "POST",
       body: data,
       headers: {
           'Content-Type': 'application/json'
       }
   });

   let result;

   if (response.ok) {
       try {
           result = await response.json();
       } catch (error) {
           console.error('Error parsing JSON:', error);
           alert('Error parsing JSON: ' + error);
       }
   } else {
       console.error('Fetch request failed with status:', response.status);
       // Log the response body as text
       console.error('Response text:', await response.text()); 
       alert('Fetch request failed with status: ' + response.status);
   }

   return result;
}
