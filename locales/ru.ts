import {
  basic,
  createPost,
  expiredSession,
  forgotPassword,
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

  basicError: 'Что-то пошло не так',
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

  menu: {
    copyLink: 'Скопировать ссылку',
    create: 'Создать',
    favorites: 'Избранное',
    home: 'Домой',
    logOut: 'Выход',
    logOutModal: {
      getText: (userEmail: string) => {
        return `Вы действительно хотите выйти из своей учетной записи "${userEmail}"?`
      },
      no: 'Нет',
      title: 'Выход',
      yes: 'Да',
    },
    messenger: 'Сообщения',
    profile: 'Профиль',
    profileSettings: 'Настройки профиля',
    search: 'Поиск',
    statistics: 'Статистика',
    unfollow: 'Отписаться',
  },

  notFoundButton: 'Вернуться назад',
  notFoundText:
    'Здесь, кажется, ничего нет. Ты можешь вернуться назад или воспользоваться меню.',
  pagination: {
    goBack: 'Назад',
    goForward: 'Вперед',
  },

  post: {
    modalText: 'Вы уверены, что хотите удалить этот пост?',
    modalTitle: 'Удалить пост',
    no: 'Нет',
    successMessage: 'Публикация была успешно удалена',
    yes: 'Да',
  },

  profileInputs: {
    aboutMe: 'Обо мне',
    addProfilePhoto: 'Загрузить фото',
    city: 'Выьерите ваш город',
    country: 'Выьерите вашу страну',
    dateOfBirth: 'Дата рождения',
    firstName: 'Имя',
    lastName: 'Фамилия',
    placeholders: {
      city: 'Город',
      country: 'Страна',
    },
    saveChanges: 'Сохранить изменения',
    updateStatusMessages: {
      error: 'Что-то пошло не так',
      success: 'Ваши данные сохранены',
    },
    userName: 'Имя пользователя',
  },

  profilePage: {
    followers: 'Подписчики',
    following: 'Подписки',
    noPosts: {
      alt: 'Нет постов пользователя',
      button: 'Создать пост',
      strangeText: 'Пользователь еще не опубликовал ни одного поста',
      userText: 'Ваша лента пуста. Опубликуйте ваш первый пост',
    },
    publications: 'Публикации',
    settingsButton: 'Настройки профиля',
  },

  profileSessions: {
    activeSessions: 'Активные сессии',
    currentSession: 'Текущее устройство',
    lastVisit: 'Последний визит',
    terminateAll: 'Завершить все другие сессии',
  },

  recoveryPassword: { ...recoveryPassword },

  registration: { ...registration },

  serverError:
    'Что-то пошло не так с нашей стороны. Пожалуйста, повторите попытку позже.',
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

  slider: {
    noText: 'Нет картинок для поста!',
  },
  tabs: {
    accountManagement: 'Управление аккаунтом',
    devices: 'Устройства',
    generalInfo: 'Общая информация',
    myPayments: 'Мои платежи',
  },
  termsPolicyPage: {
    back: 'Назад',
  },
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
