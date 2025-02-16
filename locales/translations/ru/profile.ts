export const profileSettings = {
  aboutMe: 'Обо мне',
  addProfilePhoto: 'Загрузить фото',
  city: 'Выберите ваш город',
  country: 'Выберите вашу страну',
  dateOfBirth: 'Дата рождения',
  firstName: 'Имя',
  lastName: 'Фамилия',
  placeholders: {
    city: 'Город',
    country: 'Страна',
  },
  saveChanges: 'Сохранить изменения',
  updateStatusMessages: 'Ваши данные сохранены',
  userName: 'Имя пользователя',
}
export const profileMyPayments = {
  accountType: 'Тип учетной записи:',
  business: 'Бизнес',
  dateOfPayment: 'Дата платежа',
  day: '1 день',

  endDateOfSubscription: 'Дата окончания подписки',
  monthly: '1 месяц',
  noPayments: 'У вас пока нет транзакций',
  paymentType: 'Тип платежа',
  per: 'за',
  personal: 'Личный',
  price: 'Цена',
  subscriptionCosts: 'Стоимость подписки:',
  subscriptionType: 'Тип подписки',
  weekly: '7 дней',
}
export const profileSessions = {
  activeSessions: 'Активные сессии',
  currentSession: 'Текущее устройство',
  lastVisit: 'Последнее посещение',
  noOtherSession: 'Вы еще не входили в систему с других устройств',
  successLogout: 'Сессия была успешно завершена',
  terminateAll: 'Завершить все другие сессии',
}

export const profilePage = {
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
}

export const profileSettingsTabs = {
  accountManagement: 'Управление аккаунтом',
  devices: 'Устройства',
  generalInfo: 'Общая информация',
  myPayments: 'Мои платежи',
}

export const avatarModal = {
  chooseButton: 'Выбрать с компьютера',
  noFile: 'Файл не выбран',
  saveButton: 'Сохранить',
  title: 'Добавить фотографию профиля',
}

export const profileManagement = {
  errorButton: 'Вернуться к оплате',
  errorDescription: 'Транзакция не удалась. Пожалуйста, напишите в поддержку.',
  or: 'ИЛИ',
  redirectMessage: (bank: string) =>
    `Вы будете перенаправлены на сайт банка ${bank} для оплаты. Продолжить?`,
  successButton: 'ОК',
  successDescription: 'Оплата прошла успешно!',
  titleModal: 'Подтверждение перехода',
}
