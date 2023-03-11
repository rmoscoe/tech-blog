const loginForm = document.querySelector(".login-form");

const loginFormHandler = async (event) => {
  event.preventDefault();
  
  const username = document.querySelector('#username-login').value.trim().toLowerCase();
  const password = document.querySelector('#password-login').value.trim();
  
  if (username && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (response.ok) {
      window.location.href = '../dashboard';
    } else {
      alert('Failed to log in.');
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim().toLowerCase();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to sign up.');
    }
  }
};

// const inputFields = document.querySelectorAll('.login-form-input');

// inputFields.forEach((field) => {
//   field.addEventListener('keyup', (event) => {
//     if (event.key === 'Enter') {
//       event.preventDefault();
//       loginForm.submit();
//     }
//   });
// });

document.getElementById("login-form").addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
