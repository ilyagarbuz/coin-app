import createAccountSectionElement from '../elements/account-section';
import createHeaderSection from '../elements/header';
import createBalanceStat from '../elements/balance-stat';
import { createHistoryTable } from '../elements/history-element';
import loadingCurrentPage from './loading-current';
import balaceChartInit from '../tools/balance-chart-init';
import { createTransferFunds } from '../api/api';
import { loadFromSessionStorage, loadFromLocalStorage, saveToLocalStorage } from '../tools/storage';
import errorInit from '../tools/error-init';
import spinnerLoader from '../elements/loader';
import '../../styles/history.css';
import '../../styles/balance-stat.css';
import '../../styles/dropdown-menu.css';

export default function createAccountPage(accountData) {
  createHeaderSection();
  createAccountSectionElement(accountData);

  const balnceStatBlock = document.querySelector('.account__balance-stat');
  if (accountData.transactions.length > 0) {
    balnceStatBlock.append(createBalanceStat(true));
    balaceChartInit(accountData.account, accountData.transactions, 6);
  } else {
    balnceStatBlock.append(createBalanceStat());
  }

  balnceStatBlock.addEventListener('click', (e) => {
    if (accountData.transactions.length > 0) {
      e.preventDefault();
      const token = loadFromSessionStorage('token');

      if (!token) {
        window.location.hash = '#login';
      } else {
        history.pushState(null, null, `/?id=${accountData.account}#history`);
        loadingCurrentPage();
      }
    }
  });

  const accountHistoryBlock = document.querySelector('.history__table');
  const transactionsArr = accountData.transactions.slice(-10);
  accountHistoryBlock.append(createHistoryTable(accountData.account, transactionsArr.reverse()));

  const accoutnBackButton = document.querySelector('.account__back-btn');
  accoutnBackButton.addEventListener('click', () => {
    window.history.back();
  });

  const transferForm = document.querySelector('.transfer-block__form');
  const beneficNumber = document.getElementById('benefic-number');
  const transAmount = document.getElementById('transfer-sum');
  const savedNumbers = loadFromLocalStorage('numbers');
  const dropdownBlock = document.getElementById('benefic-number-group');
  const dropdownConent = document.querySelector('.dropdown-content');
  if (!savedNumbers) {
    dropdownBlock.classList.remove('dropdown');
  } else {
    beneficNumber.addEventListener('focus', () => {
      dropdownConent.style.display = 'block';
    });
    beneficNumber.addEventListener('input', () => {
      dropdownConent.style.display = '';
    });
    beneficNumber.addEventListener('blur', () => {
      setTimeout(() => {
        dropdownConent.style.display = '';
      }, 150);
    });

    savedNumbers.forEach((number) => {
      const numItem = document.createElement('li');
      numItem.textContent = number;
      dropdownConent.prepend(numItem);
      numItem.addEventListener('click', () => {
        beneficNumber.value = number;
        dropdownConent.style.display = '';
        transAmount.focus();
      });
    });
  }

  transferForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const answer = confirm('Вы уверены?');
    if (!answer) return;
    spinnerLoader(true);
    const token = loadFromSessionStorage('token');
    createTransferFunds(accountData.account, beneficNumber.value, transAmount.value, token)
      .then((res) => {
        if (res.error === '') {
          document.body.innerHTML = '';
          if (!savedNumbers) {
            saveToLocalStorage('numbers', [beneficNumber.value]);
          } else {
            if (savedNumbers.indexOf(beneficNumber.value) < 0) savedNumbers.push(beneficNumber.value);
            saveToLocalStorage('numbers', savedNumbers);
          }
          createAccountPage(res.payload);
        } else {
          errorInit(res.error);
        }
      })
      .catch((err) => errorInit(err.message))
      .finally(() => {
        spinnerLoader(false);
        beneficNumber.value = '';
        transAmount.value = '';
      });
  });
}
