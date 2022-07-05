import sortArray from 'sort-array';

export default function sortBy(list, choice) {
  const currentList = list;

  if (choice === 'transaction') {
    sortArray(currentList, {
      by: 'date',
      computed: {
        date: (row) => {
          if (row.transactions.length > 0) return row.transactions[0].date;
          return '0';
        },
      },
    });
  } else {
    sortArray(currentList, {
      by: `${choice}`,
    });
  }
  return currentList;
}
