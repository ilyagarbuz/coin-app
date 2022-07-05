import errorElement from '../elements/error';

export default function errorInit(errMessage) {
  if (errMessage === 'Failed to fetch') {
    errorElement(true, 'Проверьте подключение к сети или попробуйте позже!');
    setTimeout(() => {
      errorElement(false);
    }, 5000);
  } else if (errMessage === "Cannot read properties of null (reading 'token')") {
    errorElement(true, 'Не верный логин или пароль!');
    setTimeout(() => {
      errorElement(false);
    }, 5000);
  } else if (errMessage === 'Invalid account to') {
    errorElement(true, 'Счёта с таким номером не существует');
    setTimeout(() => {
      errorElement(false);
    }, 5000);
  } else if (errMessage === 'Overdraft prevented') {
    errorElement(true, 'Недостаточно средств');
    setTimeout(() => {
      errorElement(false);
    }, 5000);
  } else {
    errorElement(true, 'Не известаня ошибка!');
    setTimeout(() => {
      errorElement(false);
    }, 5000);
  }
}
