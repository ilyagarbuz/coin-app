import styles from './styles/common.css';
import loadingCurrentPage from './scripts/pages/loading-current';

loadingCurrentPage();

window.addEventListener('popstate', () => {
  document.body.innerHTML = '';
  loadingCurrentPage();
});
