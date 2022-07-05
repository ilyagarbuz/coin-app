import { el } from 'redom';

export function createCurrencySection(userCurrenciesData) {
  const currentySection = el(
    'section',
    { className: 'currency' },
    el(
      'div',
      { className: 'currency__container container' },
      el('h2', 'Валютный обмен', { className: 'currency__title' }),
      el(
        'div',
        { className: 'currency__content content-currency' },
        el(
          'div',
          { className: 'content-currency__block box-1' },
          el('h3', 'Ваши валюты', { className: 'currency-content__title' }),
          el(
            'ul',
            { className: 'content-currency__list user-currencies-list' },
          ),
        ),
        el(
          'div',
          { className: 'content-currency__block box-2' },
          el('h3', 'Изменение курсов в реальном времени', { className: 'currency-content__title' }),
          el(
            'ul',
            { className: 'content-currency__list', id: 'currency-feed-list' },
          ),
        ),
        el(
          'div',
          { className: 'content-currency__block box-3' },
          el('h3', 'Обмен валюты', { className: 'currency-content__title' }),
          el(
            'form',
            { className: 'content-currency__form form-currency', action: '#' },
            el(
              'div',
              { className: 'form-currency__input-group' },
              el(
                'div',
                { className: 'form-currency__input-row' },
                el('label', 'Из', { className: 'form-currency__label', for: 'from' }),
                el('select', {
                  className: 'form-currency__input', id: 'currency-from',
                }),
                el('label', 'в', { className: 'form-currency__label', for: 'to' }),
                el('select', {
                  className: 'form-currency__input', id: 'currency-to',
                }),
              ),
              el(
                'div',
                { className: 'form-currency__input-row' },
                el('label', 'Сумма', { className: 'form-currency__label', for: 'currency-amount' }),
                el('input', {
                  className: 'form-currency__input', id: 'currency-amount', placeholder: '0.000', type: 'number', autocomplete: 'off',
                }),
              ),
            ),
            el('button', 'Обменять', { className: 'form-currency__button button', type: 'submit', disabled: 'true' }),
          ),
        ),
      ),
    ),
  );

  const userCurrenciesList = currentySection.querySelector('.user-currencies-list');
  for (const key in userCurrenciesData) {
    userCurrenciesList.append(createUserCurrencyElement(userCurrenciesData[key].code, userCurrenciesData[key].amount.toFixed(3)));
  }
  document.body.append(currentySection);
}

export function createUserCurrencyElement(code, amount) {
  return el(
    'li',
    { className: 'content-currency__item' },
    el('div', `${code}`, { className: 'currency-content__item-name' }),
    el('span', { className: 'dotts' }),
    el('div', `${amount}`, { className: 'currency-content__item-value' }),
  );
}
