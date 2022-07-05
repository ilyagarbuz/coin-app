import Choices from 'choices.js';

export function choicesInitSortAccounts(select) {
  new Choices(select, {
    choices: [
      {
        value: '',
        label: 'Сортировка',
        selected: true,
        disabled: false,
      },
      {
        value: 'account',
        label: 'По номеру',
        selected: false,
        disabled: false,
      },
      {
        value: 'balance',
        label: 'По балансу',
        selected: false,
        disabled: false,
      },
      {
        value: 'transaction',
        label: 'По последней транзакции',
        selected: false,
        disabled: false,
      }],
    searchEnabled: false,
    placeholder: true,
    placeholderValue: 'Сортировка',
    itemSelectText: '',
  });
}

export function choicesInitCurrency(select, currenciesCodes, defaultCode) {
  const choicesArr = currenciesCodes.map((code) => {
    if (code == defaultCode) {
      return {
        value: code,
        label: code,
        selected: true,
        disabled: false,
      };
    }
    return {
      value: code,
      label: code,
      selected: false,
      disabled: false,
    };
  });

  new Choices(select, {
    choices: choicesArr,
    searchEnabled: false,
    placeholder: false,
    itemSelectText: '',
  });
}
