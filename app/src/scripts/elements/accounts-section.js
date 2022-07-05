import { el, mount } from 'redom';
import '../../styles/accounts.css';

export default function createAccountsSectionElement() {
  const accountsSection = el(
    'section',
    { className: 'accounts' },
    el(
      'div',
      { className: 'accounts__container container' },
      el(
        'div',
        { className: 'accounts__top' },
        el(
          'div',
          { className: 'accounts__top-left' },
          el('h2', 'Ваши счета', { className: 'accounts__title title' }),
          el('select', { className: 'accounts__store', id: 'store-accounts' }),
        ),
        el(
          'div',
          { className: 'accounts__top-rigth' },
          el('button', 'Создать новый счёт', { className: 'accounts__new-account-button button' }),
        ),
      ),
      el(
        'ul',
        { className: 'accounts__list' },
      ),
      el(
        'div',
        { className: 'loader' },

        { style: 'background-color: transparent; height: 100vh;' },
        el('div', { className: 'loader__spinner' }),
      ),
    ),
  );

  mount(document.body, accountsSection);
}
