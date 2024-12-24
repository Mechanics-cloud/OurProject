import {
  basic,
  createPost,
  expiredSession,
  forgotPassword,
  menu,
  profilePage,
  profileSessions,
  profileSettings,
  profileSettingsTabs,
  recoveryPassword,
  registration,
  signIn,
  signUp,
} from '@locales/translations/ru'

export const ru = {
  actionIconsGroup: {
    addFavorite: 'Добавить в избранное',
    isLiked: 'Нравится',
    message: 'Сообщения',
    share: 'Поделиться',
  },

  avatarModal: {
    chooseButton: 'Выбрать с компьютера',
    errors: {
      chooseFile: 'Выберите файл.',
      error: 'Ошибка!',
      fileSize: 'Размер файла должен быть не более 10 MB!',
      fileType: 'Формат загружаемого файла должен быть PNG или JPG/JPEG.',
      unknownError: 'Неизвестная ошибка.',
    },
    saveButton: 'Сохранить',
    title: 'Добавить фотографию профиля',
  },

  basic: { ...basic },
  createPost: { ...createPost },
  expiredSession: { ...expiredSession },
  forgotPassword: { ...forgotPassword },

  homePage: {
    addComments: 'Добавить комментарий...',
    emptyPostsButton: 'Найти друзей',
    like: 'Нравится',
    likes: 'Нравится',
    loading: 'Загрузка...',
    noPostsAlt: 'Нет постов',
    noPostsText:
      'Лента пуста. Чтобы увидеть посты друзей, необходимо на них подписаться',
    publish: 'Опубликовать',
    viewAllComments: 'Посмотреть все комментарии',
  },

  menu: { ...menu },

  notFoundText:
    'Здесь, кажется, ничего нет. Ты можешь вернуться назад или воспользоваться меню.',

  post: {
    modalText: 'Вы уверены, что хотите удалить этот пост?',
    modalTitle: 'Удалить пост',
    successMessage: 'Публикация была успешно удалена',
  },

  profilePage: { ...profilePage },
  profileSessions: { ...profileSessions },
  profileSettings: { ...profileSettings },
  profileSettingsTabs: { ...profileSettingsTabs },
  recoveryPassword: { ...recoveryPassword },

  registration: { ...registration },

  session: {
    activeSession: 'Активные сессии',
    currentDevice: 'Текущее устройство',
    devices: 'Устройства',
    lastVisit: 'Последнее посещение',
    logOut: 'Выйти',
    successLogout: 'Сессия была успешно завершена',
    terminateAll: 'Завершить все остальные сеансы',
  },
  showText: {
    less: 'Свернуть',
    more: 'Развернуть',
  },
  signIn: { ...signIn },
  signUp: { ...signUp },

  userCounter: {
    text: 'Зарегистрированных пользователей:',
  },
  validation: {
    email: {
      composition:
        'Электронное письмо должно соответствовать формату example@example.com.',
      required: 'Требуется электронная почта',
    },
    password: {
      composition: 'Пароль должен содержать',
      match: 'Пароли должны совпадать',
      maxChar: 'Максимальное количество символов 20',
      minChar: 'Минимальное количество символов 6',
    },
    recaptchaRequired: 'Требуется Recaptcha',
  },
}

export type LocaleType = typeof ru
