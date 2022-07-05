export default function menuBurgerInit(btn, menu) {
  btn.addEventListener('change', () => {
    if (btn.checked) {
      menu.style.transform = 'none';
    } else {
      menu.style.transform = '';
    }
  });
}
