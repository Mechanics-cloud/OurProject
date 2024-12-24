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
