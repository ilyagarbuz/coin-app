import { el } from 'redom';
import { createCurrencyBuy, getAllCurrencies } from '../api/api';
import { createCurrencySection, createUserCurrencyElement } from '../elements/currency-section';
import createHeaderSection from '../elements/header';
import { choicesInitCurrency } from '../tools/choices-init';
import errorInit from '../tools/error-init';
import { checkInputs } from '../tools/validations';

export default function createCurrencyPage(userCurrencies, token) {
  createHeaderSection();
  createCurrencySection(userCurrencies);

  const fromSelect = document.getElementById('currency-from');
  const toSelect = document.getElementById('currency-to');
  const amountInput = document.getElementById('currency-amount');
  const currencyFeedList = document.getElementById('currency-feed-list');
  const formCurrency = document.querySelector('.form-currency');

  getAllCurrencies()
    .then((res) => {
      choicesInitCurrency(fromSelect, res.payload, 'BTC');
      choicesInitCurrency(toSelect, res.payload, 'ETH');
    });

  const socket = new WebSocket('ws://localhost:3000/currency-feed');

  socket.onopen = function (e) {
    console.log('[open] Соединение установлено');
  };

  socket.onerror = function (error) {
    errorInit();
  };

  socket.onmessage = function (event) {
    const socketData = JSON.parse(event.data);
    currencyFeedList.prepend(createCurrencyFeedItem(socketData.from, socketData.to, socketData.rate, socketData.change));
    if (currencyFeedList.children.length > 18) {
      currencyFeedList.removeChild(currencyFeedList.lastChild);
    }
  };

  socket.onclose = function (event) {
    if (event.wasClean) {
      alert(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
    } else {
      // например, сервер убил процесс или сеть недоступна
      // обычно в этом случае event.code 1006
      errorInit('Failed to fetch');
    }
  };

  amountInput.addEventListener('blur', () => {
    const currencyBtn = document.querySelector('.form-currency__button');
    if (amountInput.value === '' || amountInput.value <= 0) {
      currencyBtn.setAttribute('disabled', 'true');
    } else {
      currencyBtn.removeAttribute('disabled');
    }
  });

  formCurrency.addEventListener('submit', (e) => {
    e.preventDefault();
    const from = document.getElementById('currency-from').nextSibling.querySelector('.choices__item').dataset.value;
    const to = document.getElementById('currency-to').nextSibling.querySelector('.choices__item').dataset.value;
    const amount = document.getElementById('currency-amount').value;
    const currencyBtn = document.querySelector('.form-currency__button');
    currencyBtn.classList.add('loading');
    createCurrencyBuy(from, to, amount, token)
      .then((res) => {
        const userCurrenciesList = document.querySelector('.user-currencies-list');
        userCurrenciesList.innerHTML = '';
        for (const key in res.payload) {
          userCurrenciesList.append(createUserCurrencyElement(res.payload[key].code, res.payload[key].amount));
        }
        currencyBtn.classList.add('done');
        setTimeout(() => {
          currencyBtn.classList.remove('done');
        }, 2500);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        amountInput.value = '';
        currencyBtn.setAttribute('disabled', 'true');
        currencyBtn.classList.remove('loading');
      });
  });
}

function createCurrencyFeedItem(from, to, rate, change) {
  if (change < 0) {
    return el(
      'li',
      { className: 'content-currency__item' },
      el('div', `${from}`, { className: 'currency-content__item-name', id: 'currency-feed-from' }),
      el('span', '/', { className: 'slash' }),
      el('div', `${to}`, { className: 'currency-content__item-name', id: 'currency-feed-from' }),
      el('span', { className: 'dotts' }),
      el('div', `${rate}`, { className: 'currency-content__item-value down', id: 'currency-feed-rate' }),
    );
  }

  return el(
    'li',
    { className: 'content-currency__item' },
    el('div', `${from}`, { className: 'currency-content__item-name', id: 'currency-feed-from' }),
    el('span', '/', { className: 'slash' }),
    el('div', `${to}`, { className: 'currency-content__item-name', id: 'currency-feed-from' }),
    el('span', { className: 'dotts' }),
    el('div', `${rate}`, { className: 'currency-content__item-value up', id: 'currency-feed-rate' }),
  );
}
