import createAtmSection from '../elements/atm-section';
import createHeaderSection from '../elements/header';
import '../../styles/atm.css';
import initMap from '../tools/atm-map-init';

export default function createAtmPage(points) {
  createHeaderSection();
  createAtmSection();
  initMap(points);
}
