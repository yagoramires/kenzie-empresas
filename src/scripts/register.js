import { handleModal } from './header.js';
import { error } from './toast.js';

handleModal();

const URL = 'http://localhost:6278';

const registerForm = document.querySelector('.main__form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const levelSelect = document.querySelector('#level');

registerForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = nameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;
  const level = levelSelect.options[levelSelect.selectedIndex].value;

  if (!name || !email || !password) {
    console.log('erro');
    return;
  }

  createUser(name, email, password, level);
});

const createUser = async (name, email, password, level) => {
  let options;
  if (level === '') {
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: name,
        password,
        email: email.toLowerCase(),
      }),
    };
  } else {
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: name,
        password,
        email: email.toLowerCase(),
        professional_level: level,
      }),
    };
  }

  const req = await fetch(URL + '/auth/register', options);
  const res = await req.json();
  console.log(res);

  if (req.status === 201) {
    window.location.href = 'http://localhost:5500/src/pages/login.html';
  } else {
    error(res.error[0]);
  }
};
