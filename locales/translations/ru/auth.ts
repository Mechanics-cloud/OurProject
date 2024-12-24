export const expiredSession = {
  emailExpired: 'Ссылка для подтверждения электронной почты истекла',
  pictureExpired: 'Изображение истекшей ссылки',
  resendLink: 'Отправить ссылку снова',
  sendLinkAgain:
    'Похоже, что ссылка для подтверждения истекла. Не переживайте, мы можем отправить ссылку снова',
}

export const forgotPassword = {
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
}

export const recoveryPassword = {
  createNewPassword: 'Создать новый пароль',
  newPassword: 'Новый пароль',
  passwordChanged: 'Пароль был успешно изменен!',
  passwordConfirmation: 'Подтверждение пароля',
  passwordValidation: 'Ваш пароль должен содержать от 6 до 20 символов',
}

export const registration = {
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
}

export const signIn = {
  errorResponse:
    'Указан неверный адрес электронной почты или пароль. Попробуйте еще раз, пожалуйста',
  labelEmail: 'Электронная почта',
  labelPassword: 'Пароль',
  passwordRecovery: 'Забыли пароль',
  placeholderPassword: 'Введите пароль',
  signUpTitle: 'Зарегистрироваться',
  text: 'У вас нет учетной записи?',
  title: 'Вход',
}

export const signUp = {
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
}

export const validation = {
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
}
