import { el, mount } from 'redom';
import '../../styles/login.css';

export default function createLoginSectionElement() {
  const loginSection = el(
    'section',
    { className: 'login' },
    el(
      'div',
      { className: 'login__container container' },
      el(
        'div',
        { className: 'login__box' },
        el('h2', 'Вход в аккаунт', { className: 'login__title' }),
        el(
          'form',
          { className: 'login__form form-login' },
          el(
            'div',
            { className: 'form-login__input-group' },
            el('label', 'Логин', { className: 'form-login__label', for: 'login' }),
            el('div', 'Не корректный логин', { className: 'error-input' }),
            el('input', {
              className: 'form-login__input', id: 'login', placeholder: 'Введите логин', autocomplete: 'off',
            }),
          ),
          el(
            'div',
            { className: 'form-login__input-group' },
            el('label', 'Пароль', { className: 'form-login__label', for: 'password' }),
            el('div', 'Не корректный пароль', { className: 'error-input' }),
            el('input', {
              className: 'form-login__input', id: 'password', placeholder: 'Введите пароль', type: 'password', autocomplete: 'off',
            }),
          ),
          el(
            'div',
            { className: 'from-login__button-block' },
            el('button', 'Войти', { className: 'form-login__submit-button button', type: 'submit' }),
          ),
        ),
        el(
          'div',
          { className: 'loader' },
          el('div', { className: 'loader__spinner' }),
        ),
      ),
    ),
  );

  mount(document.body, loginSection);
}
