export const ru = {
  logIn: 'Вход',
  menu: {
    create: 'Создать',
    favorites: 'Избранное',
    home: 'Домой',
    logOut: 'Выход',
    messenger: 'Сообщения',
    profile: 'Профиль',
    search: 'Поиск',
    statistics: 'Статистика',
  },
  pagination: {
    goBack: 'Назад',
    goForward: 'Вперед',
  },
  signIn: 'Вход',
  signUp: 'Регистрация',
  signUpForm: {
    confirmSignUpModal: {
      getDescription: (userEmail: string) => {
        return `Мы отправили ссылку для подтверждения вашего электронного письма на ${userEmail}`
      },
      title: 'Письмо отправлено',
    },
    labels: {
      agree: 'Я согласен',
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
    policy: 'Политика конфиденциальности',
    signUpGithub: 'Регистрация с помощью Github',
    signUpGoogle: 'Регистрация с помощью Google',
    terms: 'Условия использования',
    text: 'Уже есть аккаунт?',
    title: 'Регистрация',
  },
  termsPolicyPage: {
    back: 'Назад',
  },
}

export type LocaleType = typeof ru
