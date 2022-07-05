import createHeaderSection from '../elements/header';
import createAccountsPage from './accounts';
import createLoginSectionElement from '../elements/login-section';
import { saveToSessionStorage } from '../tools/storage';
import { getUserToken, getUserAccounts } from '../api/api';
import { loginValid, checkInputs } from '../tools/validations';
import errorInit from '../tools/error-init';

export default function createLoginPage() {
  document.body.innerHTML = '';
  window.localStorage.clear();
  window.sessionStorage.clear();
  createHeaderSection(false);
  createLoginSectionElement();

  const loginForm = document.querySelector('.login__form');
  const userLoginInput = document.getElementById('login');
  const userPasswordInput = document.getElementById('password');
  const submitButton = document.querySelector('.form-login__submit-button');
  const formInputs = loginForm.querySelectorAll('input');
  const loaderSpinner = document.querySelector('.loader');

  checkInputs(formInputs, submitButton);

  formInputs.forEach((input) => {
    input.addEventListener('focus', () => { input.parentElement.querySelector('.error-input').style.display = ''; });
    input.addEventListener('blur', () => {
      if (!loginValid(input.value) && input.value) {
        input.parentElement.querySelector('.error-input').style.display = 'block';
        checkInputs(formInputs, submitButton);
      } else {
        checkInputs(formInputs, submitButton);
      }
    });
  });

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    loaderSpinner.style.display = 'flex';
    getUserToken(userLoginInput.value, userPasswordInput.value)
      .then((res) => {
        saveToSessionStorage('token', res.payload.token);
        return getUserAccounts(res.payload.token);
      })
      .then((res) => {
        document.body.innerHTML = '';
        window.location.hash = '#accounts';
        saveToSessionStorage('accountsData', res.payload);
        createAccountsPage(res.payload);
      })
      .catch((err) => {
        errorInit(err.message);
      })
      .finally(() => {
        loaderSpinner.style.display = '';
      });
  });
}
