export const ru = {
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
    search: 'Поиск',
    statistics: 'Статистика',
    unfollow: 'Отписаться',
  },
  notFoundButton: 'Вернуться назад',
  pagination: {
    goBack: 'Назад',
    goForward: 'Вперед',
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
    signUpGithub: 'Регистрация с помощью Github',
    signUpGoogle: 'Регистрация с помощью Google',
    terms: 'Условиями использования',
    text: 'Уже есть аккаунт?',
    title: 'Регистрация',
  },
  termsPolicyPage: {
    back: 'Назад',
  },
  validation: {
    recaptchaRequired: 'Требуется Recaptcha',
  },
}

export type LocaleType = typeof ru
