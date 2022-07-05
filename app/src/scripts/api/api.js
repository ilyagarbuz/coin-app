export async function getUserToken(userLogin, userPassword) {
  const response = await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      login: userLogin,
      password: userPassword,
    }),
  });

  return response.json();
}

export async function getUserAccounts(token) {
  const response = await fetch('http://localhost:3000/accounts', {
    method: 'GET',
    headers: {
      Authorization: `Basic ${token}`,
      'Content-Type': 'application/json',
    },
  });

  return response.json();
}

export async function createNewAccount(token) {
  const response = await fetch('http://localhost:3000/create-account', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${token}`,
      'Content-Type': 'application/json',
    },
  });

  return response.json();
}

export async function getUserAccount(token, id) {
  const response = await fetch(`http://localhost:3000/account/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${token}`,
      'Content-Type': 'application/json',
    },
  });

  return response.json();
}

export async function createTransferFunds(from, to, amount, token) {
  const response = await fetch('http://localhost:3000/transfer-funds', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to,
      amount,
    }),
  });

  return response.json();
}

export async function getAllCurrencies(token) {
  const response = await fetch('http://localhost:3000/all-currencies', {
    method: 'GET',
    headers: {
      Authorization: `Basic ${token}`,
      'Content-Type': 'application/json',
    },
  });

  return response.json();
}

export async function getUserCurrencies(token) {
  const response = await fetch('http://localhost:3000/currencies', {
    method: 'GET',
    headers: {
      Authorization: `Basic ${token}`,
      'Content-Type': 'application/json',
    },
  });

  return response.json();
}

export async function getCurrencyFeed(token) {
  const response = await fetch('http://localhost:3000/currency-feed', {
    method: 'GET',
    headers: {
      Authorization: `Basic ${token}`,
      'Content-Type': 'application/json',
    },
  });

  return response.json();
}

export async function getAtmsLocations(token) {
  const response = await fetch('http://localhost:3000/banks', {
    method: 'GET',
    headers: {
      Authorization: `Basic ${token}`,
      'Content-Type': 'application/json',
    },
  });

  return response.json();
}

export async function createCurrencyBuy(from, to, amount, token) {
  const response = await fetch('http://localhost:3000/currency-buy', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to,
      amount,
    }),
  });

  return response.json();
}
