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
