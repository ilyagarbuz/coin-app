import { el, mount } from 'redom';

export default function errorElement(active, text) {
  if (!active) {
    document.body.querySelector('.error-block').remove();
    return;
  }
  const errorBlock = el('div', { className: 'error-block' });
  const errorMessage = el('div', `${text}`, { className: 'error-message' });
  mount(errorBlock, errorMessage);
  document.body.append(errorBlock);
}
