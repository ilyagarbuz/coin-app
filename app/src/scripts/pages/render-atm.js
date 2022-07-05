import { getAtmsLocations } from '../api/api';
import spinnerLoader from '../elements/loader';
import errorInit from '../tools/error-init';
import createAtmPage from './atm';

export default function renderAtmPage(token) {
  spinnerLoader(true);
  getAtmsLocations(token)
    .then((res) => createAtmPage(res.payload))
    .catch((err) => errorInit(err.message))
    .finally(() => {
      spinnerLoader(false);
      document.getElementById('atm').classList.add('selected');
    });
}
