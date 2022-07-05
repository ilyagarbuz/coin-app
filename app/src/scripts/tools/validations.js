export function loginValid(str) {
  if (str.length >= 6 && str.indexOf(' ') < 0) return true;
  return false;
}

export function checkInputs(inputs, button) {
  const errors = [];
  inputs.forEach((input) => {
    if (input.value.length <= 0 || !loginValid(input.value)) {
      errors.push(input);
    }
  });

  if (errors.length <= 0) {
    button.removeAttribute('disabled');
    return true;
  }
  button.setAttribute('disabled', 'true');
  return false;
}
