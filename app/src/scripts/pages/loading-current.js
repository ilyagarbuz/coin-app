import { loadFromSessionStorage } from '../tools/storage';
import createLoginPage from './login';
import renderAccountsPage from './render-accounts';
import renderAccountPage from './render-account';
import renderCurrencyPage from './render-currency';
import renderAtmPage from './render-atm';

export default function loadingCurrentPage() {
  if (window.location.hash === '#accounts') {
    const token = loadFromSessionStorage('token');
    if (!token) {
      window.location.hash = '#login';
      createLoginPage();
    } else {
      renderAccountsPage(token);
    }
  } else if (window.location.hash === '#account') {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const token = loadFromSessionStorage('token');
    if (!token) {
      window.location.hash = '#login';
      createLoginPage();
    } else {
      renderAccountPage(token, id);
    }
  } else if (window.location.hash === '#history') {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const token = loadFromSessionStorage('token');
    if (!token) {
      window.location.hash = '#login';
      createLoginPage();
    } else {
      renderAccountPage(token, id, true);
    }
  } else if (window.location.hash === '#login' || window.location.hash === '') {
    createLoginPage();
  } else if (window.location.hash === '#currency') {
    const token = loadFromSessionStorage('token');
    if (!token) {
      window.location.hash = '#login';
      createLoginPage();
    } else {
      renderCurrencyPage(token);
    }
  } else if (window.location.hash === '#atm') {
    const token = loadFromSessionStorage('token');
    if (!token) {
      window.location.hash = '#login';
      createLoginPage();
    } else {
      renderAtmPage(token);
    }
  }
}
