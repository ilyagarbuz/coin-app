import { choicesInitSortAccounts } from '../tools/choices-init';
import createHeaderSection from '../elements/header';
import { createNewAccount, getUserAccounts } from '../api/api';
import { loadFromSessionStorage } from '../tools/storage';
import createAccountsSectionElement from '../elements/accounts-section';
import createAccountItem from '../elements/account-item';
import sortBy from '../tools/sort';
import spinnerLoader from '../elements/loader';
import '../../assets/styles/choices.min.css';
import errorInit from '../tools/error-init';

export default function createAccountsPage(accountsData) {
  createHeaderSection();
  createAccountsSectionElement();

  const newAccountButton = document.querySelector('.accounts__new-account-button');
  const accountsList = document.querySelector('.accounts__list');

  newAccountButton.addEventListener('click', (e) => {
    e.preventDefault();
    const token = loadFromSessionStorage('token');

    spinnerLoader(true);
    createNewAccount(token)
      .then((res) => accountsList.append(createAccountItem(res.payload)))
      .catch((err) => {
        errorInit(err.message);
      })
      .finally(() => {
        spinnerLoader(false);
      });
  });

  accountsData.forEach((account) => {
    accountsList.append(createAccountItem(account));
  });

  const select = document.getElementById('store-accounts');
  choicesInitSortAccounts(select);

  select.addEventListener('change', () => {
    const option = select.querySelector('option');
    const token = loadFromSessionStorage('token');

    spinnerLoader(true);

    getUserAccounts(token)
      .then((res) => sortBy(res.payload, option.value))
      .then((res) => {
        accountsList.innerHTML = '';
        res.forEach((account) => {
          accountsList.append(createAccountItem(account));
        });
      })
      .catch((err) => {
        errorInit(err.message);
      })
      .finally(() => {
        spinnerLoader(false);
      });
  });
}
