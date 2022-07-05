import createCurrencyPage from './currency';
import '../../styles/currency.css';
import { getCurrencyFeed, getUserCurrencies, getUserToken } from '../api/api';
import spinnerLoader from '../elements/loader';
import errorInit from '../tools/error-init';

export default function renderCurrencyPage(token) {
  spinnerLoader(true);
  getUserCurrencies(token)
    .then((res) => createCurrencyPage(res.payload, token))
    .catch((err) => errorInit(err.message))
    .finally(() => {
      spinnerLoader(false);
      document.getElementById('currency').classList.add('selected');
    });
}
