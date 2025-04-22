const errors = {
  emptyImages:
    'Не удалось отобразить фотографии поста. Пожайлуста обратитесь в поддержку или повторите попытку позже!',
  emptySwiper: 'Нет картинок',
  error: 'Ошибка',
  server:
    'Что-то пошло не так с нашей стороны. Пожалуйста, повторите попытку позже.',
  tooBigFile: (size: number) =>
    `Файл слишком большой. Файл должен быть не более ${size}MB`,
  type: (types: string) => `Неверный тип файла. Загрузить можно ${types}`,
  unknown: 'Что-то пошло не так',
}

export const basic = {
  discard: 'Отмена',
  errors: { ...errors },
  gallery: 'Картинка в карусели',
  goToTop: 'Вверх',
  loading: 'Загрузка...',
  logOut: 'Выход',
  next: 'Дальше',
  no: 'Нет',
  notFoundTitle:
    'Здесь, кажется, ничего нет. Ты можешь вернуться назад или воспользоваться меню.',
  pagination: {
    goBack: 'Назад',
    goForward: 'Вперед',
    onPage: 'на странице',
    show: 'Показать',
  },
  subscribeMessage: 'Ура! Теперь вы с нами!',
  success: 'Успех',
  textFolding: {
    less: 'Свернуть',
    more: 'Развернуть',
  },
  unsubscribeMessage: 'Нам будет вас не хватать!',
  userCounter: 'Зарегистрированных пользователей:',
  welcome: 'Добро пожаловать! Пожалуйста, войдите.',
  yes: 'Да',
}
