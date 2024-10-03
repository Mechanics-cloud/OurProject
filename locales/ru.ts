export const ru = {
  basicError: 'Что-то пошло не так',
  logIn: 'Вход',
  menu: {
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
  },
  pagination: {
    goBack: 'Назад',
    goForward: 'Вперед',
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
}

export type LocaleType = typeof ru
