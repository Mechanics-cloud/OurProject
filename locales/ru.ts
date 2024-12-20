export const ru = {
  actionIconsGroup: {
    addFavorite: 'Добавить в избранное',
    isLiked: 'Нравится',
    message: 'Сообщения',
    share: 'Поделиться',
  },
  auth: {
    welcome: 'Добро пожаловать! Пожалуйста, войдите.',
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
  basicError: 'Что-то пошло не так',
  createPost: {
    adding: {
      buttonDraft: 'Открыть черновик',
      buttonNew: 'Загрузить фото',
      errors: {
        basic: 'Что-то пошло не так',
        countLimit: 'Лимит ',
        tooBig: 'Фото слишком большое',
        type: 'Неверный тип файла',
      },
      title: 'Добавить пост',
    },
    alt: 'Фото в карусели',
    closeModal: {
      description: 'Вы действительно хотите закрыть создание публикации?',
      discard: 'Отмена',
      save: 'Сохранить черновик',
      title: 'Закрыть',
    },
    cropping: {
      add: 'Добавить',
      crop: 'Обрезать',
      delete: 'Удалить',
      originalRatio: 'Оригинал',
      title: 'Обрезка',
      zoom: 'Приблизить',
    },
    filtering: {
      filters: 'Библиотека фильтров',
      settings: 'Настройки фильтров',
      settingsData: {
        brightness: 'Яркость',
        contrast: 'Контрастность',
        grayscale: 'Оттенки серого',
        saturate: 'Насыщенность',
        sepia: 'Сепия',
      },
      title: 'Фильтры',
    },
    next: 'Дальше',
    publication: {
      description: 'Добавить описание',
      location: 'Добавить локацию',
      locationPlaceholder: 'Введите название города...',
      publishButton: 'Опубликовать',
      success: 'Это успех :)',
      title: 'Публикация',
    },
  },
  expiredSession: {
    emailExpired: 'Ссылка для подтверждения электронной почты истекла',
    pictureExpired: 'Изображение истекшей ссылки',
    resendLink: 'Отправить ссылку снова',
    sendLinkAgain:
      'Похоже, что ссылка для подтверждения истекла. Не переживайте, мы можем отправить ссылку снова',
  },
  forgotPassword: {
    buttonTitle: 'Отправить ссылку',
    description:
      'Введите свой адрес электронной почты и мы вышлем вам дальнейшие инструкции',
    emailPlaceholder: 'Введите email',
    link: 'Вернуться к авторизации',
    modalContent: {
      getText: (userEmail: string) => {
        return `Мы отправили ссылку для подтверждения вашего электронного письма на адрес ${userEmail}`
      },
    },
    modalTitle: 'Письмо отправлено',
    resentEmail:
      'Ссылка была отправлена по электронной почте. Если вы не получили письмо, отправьте ссылку снова.',
    sendAgain: 'Отправить ссылку снова',
    title: 'Забыли пароль',
  },
  goToTop: 'Вверх',
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
  logIn: 'Вход',
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

  recoveryPassword: {
    createNewPassword: 'Создать новый пароль',
    newPassword: 'Новый пароль',
    passwordChanged: 'Пароль был успешно изменен!',
    passwordConfirmation: 'Подтверждение пароля',
    passwordValidation: 'Ваш пароль должен содержать от 6 до 20 символов',
  },
  registration: {
    confirmation: {
      buttonTitle: 'Войти',
      text: 'Ваша почта подтверждена',
      title: 'Поздравляем!',
    },
    expired: {
      buttonTitle: 'Повторно отправить ссылку для подтверждения',
      text: 'Похоже, срок действия ссылки для подтверждения истек. Не волнуйтесь, мы можем отправить ссылку еще раз.',
      title: 'Срок действия ссылки для подтверждения электронной почты истек',
    },
  },
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
  signIn: 'Вход',
  signInForm: {
    errorResponse:
      'Указан неверный адрес электронной почты или пароль. Попробуйте еще раз, пожалуйста',
    labelEmail: 'Электронная почта',
    labelPassword: 'Пароль',
    passwordRecovery: 'Забыли пароль',
    placeholderPassword: 'Введите пароль',
    signUpTitle: 'Зарегистрироваться',
    text: 'У вас нет учетной записи?',
    title: 'Вход',
  },
  signUp: 'Регистрация',
  signUpForm: {
    confirmSignUpModal: {
      getDescription: (userEmail: string) => {
        return `Мы отправили ссылку для подтверждения вашего электронного письма на ${userEmail}`
      },
      title: 'Письмо отправлено',
    },
    labels: {
      agree: 'Я согласен с',
      and: 'и',
      confirm: 'Повторите пароль',
      email: 'Почта',
      password: 'Пароль',
      userName: 'Имя пользователя',
    },
    placeholders: {
      confirm: 'Повторите пароль',
      email: 'Введите почту',
      password: 'Введите пароль',
      userName: 'Введите имя пользователя',
    },
    policy: 'Политикой конфиденциальности',
    schemaErrors: {
      userNameComposition: 'Ввод должен содержать только',
    },
    signUpGithub: 'Регистрация с помощью Github',
    signUpGoogle: 'Регистрация с помощью Google',
    terms: 'Условиями использования',
    text: 'Уже есть аккаунт?',
    title: 'Регистрация',
  },
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
