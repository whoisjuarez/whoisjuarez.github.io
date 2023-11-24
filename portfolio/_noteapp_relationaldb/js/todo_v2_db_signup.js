let confirmation = document.querySelector('.confirmation');
let loginTitle = document.querySelector('#login-title');
let signupTitle = document.querySelector('#signup-title');
let loginForm= document.querySelector('#login-form');
let signupForm= document.querySelector('#signup-form');
let btnLogin = document.querySelector('.btn-login');
let btnSignup = document.querySelector('.btn-signup');
let btnSignupLink = document.querySelector('.btn_signup_link');
let btnLoginLink = document.querySelector('.btn_login_link');

btnSignupLink.addEventListener('click', function(e){
   e.preventDefault();
   signupTitle.style.display = 'grid';
   signupForm.style.display = 'grid';
   loginTitle.style.display = 'none';
   loginForm.style.display = 'none';
})

btnLoginLink.addEventListener('click', function(e){
   e.preventDefault();
   loginTitle.style.display = 'grid';
   loginForm.style.display = 'grid';
   signupTitle.style.display = 'none';
   signupForm.style.display = 'none';
})

document.querySelector('#signup-form').addEventListener('submit', function(event) {
   event.preventDefault();
 
   let formData = new FormData(event.target);
 
   fetch('app/todo_v2_db_signup.php', {
     method: 'POST',
     body: formData
   })
   .then(response => {
     if (response.ok) {
      confirmation.style.display = 'flex';
      loginTitle.style.display = 'grid';
      loginForm.style.display = 'grid';
      signupTitle.style.display = 'none';
      signupForm.style.display = 'none';
     } else {
       console.error('Error:', response.status);
     }
   })
   .catch(error => {
     console.error(error);
   });
 });