export const PASSWORD_REGEXP =
  /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,\-./:;<=>?@[\]^_`{|}~])[0-9A-Za-z!"#$%&'()*+,\-./:;<=>?@[\]^_`{|}~]+$/

export const USER_NAME_REGEXP = /^[0-9A-Za-z_-]+$/

export const DATE_REGEX =
  /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(19|20)\d{2}$/

export const CYRILLIC_PATTERN = /[а-яА-Я]/
