const errors = {
  emptySlider: 'Нет картинок',
  server: 'Something went wrong on our end. Please try again later.',
  tooBigFile: (size: number) =>
    `Файл слишком большой. Файл должен быть не более ${size}MB`,
  type: (types: string) => `Неверный тип файла. Загружить можно ${types}`,
  unknown: 'Что-то пошло не так',
}

export const basic = {
  discard: 'Отмена',
  errors: { ...errors },
  goToTop: 'Вверх',
  logOut: 'Выход',
  next: 'Дальше',
  no: 'Нет',
  pagination: {
    goBack: 'Назад',
    goForward: 'Вперед',
  },
  welcome: 'Добро пожаловать! Пожалуйста, войдите.',
  yes: 'Да',
}
