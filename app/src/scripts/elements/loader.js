import { el, mount } from 'redom';

export default function spinnerLoader(active) {
  if (active === true) {
    const spinner = el('div', { className: 'spinner-box' }, el('div', { className: 'spinner' }));
    document.body.append(spinner);
  } else if (document.querySelector('.spinner-box')) {
    const spinner = document.querySelector('.spinner-box');
    spinner.remove();
  }
}
