import { el, mount } from 'redom';
import '../../styles/account.css';

export default function createAccountSectionElement(accountData) {
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
      el(
        'div',
        { className: 'account__main-blok' },
        el(
          'div',
          { className: 'account__transfer-block transfer-block' },
          el('h3', 'Новый перевод', { className: 'transfer-block__title title' }),
          el(
            'form',
            { className: 'transfer-block__form' },
            el(
              'div',
              { className: 'transfer-block__input-group dropdown', id: 'benefic-number-group' },
              el('label', 'Номер счёта получателя', { className: 'transfer-block__label', for: 'benefic-number' }),
              el('input', {
                className: 'transfer-block__input dropbtn',
                id: 'benefic-number',
                placeholder: 'Cчёт получателя',
                type: 'number',
                inputmode: 'numeric',
                // autocomplete: 'off',
                required: 'true',
              }),
              el(
                'ul',
                { className: 'dropdown-content' },
              ),
            ),
            el(
              'div',
              { className: 'transfer-block__input-group' },
              el('label', 'Сумма перевода', { className: 'transfer-block__label', for: 'transfer-sum' }),
              el('input', {
                className: 'transfer-block__input',
                id: 'transfer-sum',
                placeholder: 'Сумма перевода',
                type: 'number',
                inputmode: 'numeric',
                autocomplete: 'off',
                required: 'true',
                min: '1',
              }),
            ),
            el('button', 'Отправить', { className: 'transfer-block__button button', type: 'submit' }),
          ),
        ),
        el('div', { className: 'account__balance-stat' }),
      ),
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
