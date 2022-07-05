import { el, mount } from 'redom';
import '../../styles/account.css';

export default function createAccountHistorySectionElement(accountData) {
  const accountSection = el(
    'section',
    { className: 'account' },
    el(
      'div',
      { className: 'account__container container' },
      el(
        'div',
        { className: 'account__head' },
        el('h2', 'Просмотор счёта', { className: 'account__title title' }),
        el('button', 'Вернуться назад', { className: 'account__back-btn button' }),
      ),
      el(
        'div',
        { className: 'account__head' },
        el('div', `№ ${accountData.account}`, { className: 'account__number' }),
        el(
          'div',
          { className: 'account__balance balance' },
          el('span', 'Баланс', { className: 'balance__title' }),
          el('div', `${Math.ceil((accountData.balance) * 100) / 100} ₽`, { className: 'balance__sum' }),
        ),
      ),
      el('div', { className: 'account__balance-stat' }),
      el(
        'div',
        { className: 'account__history history' },
        el('h3', 'История переводов', { className: 'history__title title' }),
        el('div', { className: 'history__table' }),
      ),
    ),
  );

  mount(document.body, accountSection);
}
