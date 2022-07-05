import createHeaderSection from '../elements/header';
import createAccountHistorySectionElement from '../elements/account-history-section';
import createBalanceStat from '../elements/balance-stat';
import { createHistoryTable, histortyTablePagination } from '../elements/history-element';
import balaceChartInit from '../tools/balance-chart-init';
import '../../styles/history.css';
import '../../styles/balance-stat.css';

export default function createHistoryAccountPage(accountData) {
  createHeaderSection();
  createAccountHistorySectionElement(accountData);
  const balnceStatBlock = document.querySelector('.account__balance-stat');
  if (accountData.transactions.length > 0) {
    const balanceStats = createBalanceStat(true, true);
    balanceStats.forEach((stat) => {
      balnceStatBlock.append(stat);
    });
    balaceChartInit(accountData.account, accountData.transactions, 12);
  } else {
    balnceStatBlock.append(createBalanceStat());
  }

  const accountHistoryBlock = document.querySelector('.history__table');
  if (accountData.transactions.length > 25) {
    const paginationArray = chunkArray(accountData.transactions.reverse(), 25);
    const pagesCount = paginationArray.length;

    let historyTable = createHistoryTable(accountData.account, paginationArray[0]);
    const tablePagination = document.createElement('div');
    tablePagination.classList.add('table-paggination');
    tablePagination.innerHTML = histortyTablePagination(1, pagesCount);
    accountHistoryBlock.append(historyTable);
    accountHistoryBlock.append(tablePagination);
    accountHistoryBlock.addEventListener('click', (e) => {
      if (e.target.classList.contains('plus')) {
        let currentPage = accountHistoryBlock.querySelector('.table-paggination__display').textContent;
        currentPage = Number(currentPage) + 1;
        if (currentPage <= pagesCount) {
          accountHistoryBlock.firstChild.remove();
          accountHistoryBlock.querySelector('.table-paggination__display').textContent = currentPage;
          historyTable = createHistoryTable(accountData.account, paginationArray[currentPage - 1]);
          accountHistoryBlock.prepend(historyTable);
        }
      } else if (e.target.classList.contains('minus')) {
        let currentPage = accountHistoryBlock.querySelector('.table-paggination__display').textContent;
        currentPage = Number(currentPage) - 1;
        if (currentPage >= 1) {
          accountHistoryBlock.firstChild.remove();
          accountHistoryBlock.querySelector('.table-paggination__display').textContent = currentPage;
          historyTable = createHistoryTable(accountData.account, paginationArray[currentPage - 1]);
          accountHistoryBlock.prepend(historyTable);
        }
      }
    });
  } else {
    accountHistoryBlock.append(createHistoryTable(accountData.account, accountData.transactions));
  }

  const accoutnBackButton = document.querySelector('.account__back-btn');
  accoutnBackButton.addEventListener('click', () => {
    window.history.back();
  });
}

function chunkArray(array, chunk) {
  const newArray = [];
  for (let i = 0; i < array.length; i += chunk) {
    newArray.push(array.slice(i, i + chunk));
  }
  return newArray;
}
