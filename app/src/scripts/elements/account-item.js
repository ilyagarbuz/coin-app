import { el } from 'redom';
import moment from 'moment';
import 'moment/locale/ru';
import renderAccountPage from '../pages/render-account';
import { loadFromSessionStorage } from '../tools/storage';

export default function createAccountItem(account) {
  let lastTransDate = 'Нет транзакций';
  if (account.transactions.length > 0) {
    lastTransDate = moment(account.transactions[0].date).format('LL', 'ru');
  }
  const item = el(
    'li',
    { className: 'accounts__item', id: account.account },
    el(
      'div',
      { className: 'accounts__item-left' },
      el('div', `${account.account}`, { className: 'accounts__number' }),
      el('div', `${account.balance} ₽`, { className: 'accounts__balance' }),
      el('div', 'Последняя транзакция:', { className: 'accounts__transaction-title' }),
      el('div', `${lastTransDate}`, { className: 'accounts__transaction-date' }),
    ),
    el(
      'div',
      { className: 'accounts__item-right' },
      el('a', 'Открыть', { className: 'accounts__open-button button', href: `/?id=${account.account}#account` }),
    ),
  );

  const accountOpenBtn = item.querySelector('.accounts__open-button');
  accountOpenBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const token = loadFromSessionStorage('token');

    if (!token) {
      window.location.hash = '#login';
    } else {
      history.pushState(null, null, accountOpenBtn.href);
      renderAccountPage(token, account.account);
    }
  });

  return item;
}
