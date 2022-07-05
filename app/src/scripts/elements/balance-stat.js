import { el } from 'redom';
import Chart from 'chart.js/auto';

export default function createBalanceStat(empty = false, advanced = false) {
  if (!empty) {
    const balanceStat = el(
      'div',
      { className: 'balance-stat' },
      el('h3', 'Динамика баланса', { className: 'balance-stat__title' }),
      el(
        'div',
        { className: 'balance-stat__chart' },
        el('div', 'Здесь будет график транзакций для текущего счёта', { className: 'balance-stat__empty' }),
      ),
    );
    return balanceStat;
  }
  const balanceStat = el(
    'div',
    { className: 'balance-stat' },
    el('h3', 'Динамика баланса', { className: 'balance-stat__title' }),
    el(
      'div',
      { className: 'balance-stat__chart' },
      el('canvas', { id: 'balance-chart', height: '200px' }),
    ),
  );

  if (advanced === true) {
    const advancedStat = el(
      'div',
      { className: 'balance-stat' },
      el('h3', 'Соотношение входящих исходящих транзакций', { className: 'balance-stat__title' }),
      el(
        'div',
        { className: 'balance-stat__chart' },
        el('canvas', { id: 'balance-chart-advanced', height: '200px' }),
      ),
    );

    return [balanceStat, advancedStat];
  }

  return balanceStat;
}
