import { el } from 'redom';
import moment from 'moment';
import loadingCurrentPage from '../pages/loading-current';
import { loadFromSessionStorage } from '../tools/storage';

export function createHistoryTable(account, transactions) {
  if (transactions.length > 0) {
    const historyHtml = `
    <thead>
      <tr>
        <td>Счёт отправителя</td>
        <td>Счёт получателя</td>
        <td>Сумма</td>
        <td>Дата</td>
      </tr>
    </thead>
    <tbody>
    </tbody>`;

    const historyTable = document.createElement('table');
    historyTable.innerHTML = historyHtml;
    const historyTableBody = historyTable.querySelector('tbody');

    transactions.forEach((transaction) => {
      const tableRow = el(
        'tr',
        el('td', `${transaction.from}`),
        el('td', `${transaction.to}`),
        el('td', `${transaction.to === account ? '+' : '-'} ${transaction.amount} ₽`, { className: `${transaction.to === account ? 'green' : 'red'}` }),
        el('td', `${moment(transaction.date).format('L')}`),
      );

      historyTableBody.append(tableRow);
    });
    const items = historyTable.querySelectorAll('tr');
    items.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const token = loadFromSessionStorage('token');

        if (!token) {
          window.location.hash = '#login';
        } else {
          history.pushState(null, null, `/?id=${account}#history`);
          loadingCurrentPage();
        }
      });
    });
    return historyTable;
  }
  const historyTable = el('div', 'Здесь будет история транзакций для текущего счёта', { className: 'no-history' });
  return historyTable;
}

export function histortyTablePagination(pagesCount, pagesAll) {
  return `  <button class="table-paggination__button button minus">⬅</button>
  <div class="table-paggination__display">${pagesCount}</div>
  <div class="table-paggination__all">... ${pagesAll}</div>
  <button class="table-paggination__button button plus">⮕</button>
  `;
}
