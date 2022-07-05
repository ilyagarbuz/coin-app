import spinnerLoader from '../elements/loader';
import { getUserAccount } from '../api/api';
import errorInit from '../tools/error-init';
import createAccountPage from './account';
import createHistoryAccountPage from './account-history';

export default function renderAccountPage(token, id, history = false) {
  if (!history) {
    spinnerLoader(true);
    getUserAccount(token, id)
      .then((res) => {
        document.body.innerHTML = '';
        return createAccountPage(res.payload);
      })
      .catch((err) => {
        errorInit(err.message);
      })
      .finally(() => {
        spinnerLoader(false);
      });
  } else {
    spinnerLoader(true);
    getUserAccount(token, id)
      .then((res) => {
        document.body.innerHTML = '';
        return createHistoryAccountPage(res.payload);
      })
      .catch((err) => {
        errorInit(err.message);
      })
      .finally(() => {
        spinnerLoader(false);
      });
  }
}
