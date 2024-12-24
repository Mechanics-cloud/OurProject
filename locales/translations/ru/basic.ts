const errors = {
  server: 'Something went wrong on our end. Please try again later.',
  tooBigFile: (size: number) =>
    `Файл слишком большой. Максимальный размер файла ${size}MB`,
  type: 'Неверный тип файла',
  unknown: 'Что-то пошло не так',
}

export const basic = {
  discard: 'Отмена',
  errors: { ...errors },
  goToTop: 'Вверх',
  next: 'Дальше',
  welcome: 'Добро пожаловать! Пожалуйста, войдите.',
}
