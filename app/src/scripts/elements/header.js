import { el, mount } from 'redom';
import '../../styles/header.css';
import menuBurgerInit from '../tools/menu-burger';

export default function createHeaderSection(nav = true) {
  const headerSection = el(
    'section',
    { className: 'header' },
    el(
      'div',
      { className: 'header__container container' },
      el('h1', 'Coin.', { className: 'header__title' }),
      el(
        'label',
        { className: 'menu-burger', for: 'check' },
        el('input', { type: 'checkbox', id: 'check' }),
        el('span'),
        el('span'),
        el('span'),
      ),
      el('div', { className: 'header__wall' }),
    ),
  );

  if (nav) {
    const headerNav = el(
      'nav',
      { className: 'header__nav nav' },
      el(
        'ul',
        { className: 'nav__list' },
        el(
          'li',
          { className: 'nav__item' },
          el('a', 'Банкоматы', { className: 'nav__link button', href: '/#atm', id: 'atm' }),
        ),
        el(
          'li',
          { className: 'nav__item' },
          el('a', 'Счета', { className: 'nav__link button', href: '/#accounts', id: 'accounts' }),
        ),
        el(
          'li',
          { className: 'nav__item' },
          el('a', 'Валюта', { className: 'nav__link button', href: '/#currency', id: 'currency' }),
        ),
        el(
          'li',
          { className: 'nav__item' },
          el('a', 'Выйти', { className: 'nav__link button', href: '/#login', id: 'login' }),
        ),
      ),
    );

    const headerContainer = headerSection.querySelector('.header__container');

    headerContainer.append(headerNav);
  }

  mount(document.body, headerSection);

  const title = document.querySelector('.header__title');
  const menuBtn = headerSection.querySelector('.menu-burger').querySelector('input');
  const menu = headerSection.querySelector('.nav');
  console.log(window.location.hash, headerSection.querySelector('.menu-burger'));
  if (window.location.hash === '#login' || window.location.hash === '') {
    headerSection.querySelector('.menu-burger').classList.add('not-show');
  } else {
    menuBurgerInit(menuBtn, menu);
  }

  title.addEventListener('click', () => {
    window.location.hash = '#login';
  });
}
