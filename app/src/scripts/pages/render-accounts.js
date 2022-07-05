import spinnerLoader from '../elements/loader';
import { getUserAccounts } from '../api/api';
import errorInit from '../tools/error-init';
import createAccountsPage from './accounts';

export default function renderAccountsPage(token) {
  spinnerLoader(true);
  getUserAccounts(token)
    .then((res) => {
      document.body.innerHTML = '';
      return createAccountsPage(res.payload);
    })
    .catch((err) => {
      errorInit(err.message);
    })
    .finally(() => {
      spinnerLoader(false);
      document.querySelector(`${window.location.hash}`).classList.add('selected');
    });
}
