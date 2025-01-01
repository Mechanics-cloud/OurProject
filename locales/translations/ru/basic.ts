const errors = {
  emptySlider: 'Нет картинок',
  server: 'Something went wrong on our end. Please try again later.',
  tooBigFile: (size: number) =>
    `Файл слишком большой. Файл должен быть не более ${size}MB`,
  type: (types: string) => `Неверный тип файла. Загрузить можно ${types}`,
  unknown: 'Что-то пошло не так',
}

export const basic = {
  discard: 'Отмена',
  errors: { ...errors },
  goToTop: 'Вверх',
  logOut: 'Выход',
  next: 'Дальше',
  no: 'Нет',
  notFoundTitle:
    'Здесь, кажется, ничего нет. Ты можешь вернуться назад или воспользоваться меню.',
  pagination: {
    goBack: 'Назад',
    goForward: 'Вперед',
  },
  textFolding: {
    less: 'Свернуть',
    more: 'Развернуть',
  },
  userCounter: 'Зарегистрированных пользователей:',
  welcome: 'Добро пожаловать! Пожалуйста, войдите.',
  yes: 'Да',
}
