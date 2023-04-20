export function containsDigit(value: string) {
  const re = /\d/;
  return re.test(value);
}

export function containsLowercase(value: string) {
  const re = /(?=.*[a-z])/;
  return re.test(value);
}

export function containsCapital(value: string) {
  const re = /(?=.*[A-Z])/;
  return re.test(value);
}

export function containsSpecialCharacter(value: string) {
  const re = /(?=.*[-+_!@#$%^&*., ?])/;
  return re.test(value);
}

export function isEmailValid(value: string) {
  const re =
    /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(value.trim());
}

export function isAadharNoValid(value: string) {
  const re = /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/;
  return re.test(value);
}

export function isNameValid(value: string) {
  const re = /^[a-zA-Z ]{2,40}$/;
  return re.test(value.trim());
}

export function isCityValid(value: string) {
  const re = /^[a-z]*$/;
  return re.test(value.trim());
}
