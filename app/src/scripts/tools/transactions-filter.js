export default function transactionsDateFilter(account, transactions, type = 'default') {
  const monthNames = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн',
    'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек',
  ];

  const positiveTransactions = transactions.filter((transaction) => transaction.to === account);
  const negativeTransactions = transactions.filter((transaction) => transaction.to !== account);

  if (type === 'positive') {
    const monthlyRceipts = {};
    positiveTransactions.forEach((transaction) => {
      const key = `${monthNames[new Date(transaction.date).getMonth()]}${new Date(transaction.date).getFullYear()}`;
      if (key in monthlyRceipts) {
        monthlyRceipts[`${key}`] += transaction.amount;
        return;
      }
      monthlyRceipts[`${key}`] = transaction.amount;
    });

    return monthlyRceipts;
  }

  if (type === 'negative') {
    const monthlyRceipts = {};
    negativeTransactions.forEach((transaction) => {
      const key = `${monthNames[new Date(transaction.date).getMonth()]}${new Date(transaction.date).getFullYear()}`;
      if (key in monthlyRceipts) {
        monthlyRceipts[`${key}`] += transaction.amount;
        return;
      }
      monthlyRceipts[`${key}`] = transaction.amount;
    });

    return monthlyRceipts;
  }

  const monthlyRceipts = {};
  positiveTransactions.forEach((transaction) => {
    const key = `${monthNames[new Date(transaction.date).getMonth()]}${new Date(transaction.date).getFullYear()}`;
    if (key in monthlyRceipts) {
      monthlyRceipts[`${key}`] += transaction.amount;
      return;
    }
    monthlyRceipts[`${key}`] = transaction.amount;
  });

  negativeTransactions.forEach((transaction) => {
    const key = `${monthNames[new Date(transaction.date).getMonth()]}${new Date(transaction.date).getFullYear()}`;
    monthlyRceipts[`${key}`] = monthlyRceipts[`${key}`] - transaction.amount;
  });

  return monthlyRceipts;
}
