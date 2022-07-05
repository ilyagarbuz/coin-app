import { el } from 'redom';

export default function createAtmSection() {
  const atmSectionElement = el(
    'section',
    { className: 'atm' },
    el(
      'div',
      { className: 'atm__container container' },
      el('h2', 'Карта банкоматов', { className: 'atm__title title' }),
      el(
        'div',
        { className: 'atm__map', id: 'map' },
      ),
    ),
  );

  document.body.append(atmSectionElement);
}
