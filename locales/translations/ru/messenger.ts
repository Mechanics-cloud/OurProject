export const messenger = {
  change: 'Изменить',
  chooseChatUser: 'Выберите, с кем бы вы хотели поговорить',
  delete: 'Удалить',
  deleteConfirm: (count: number) => {
    const number = count > 1 ? 'я' : 'е'

    return `Вы действительно хотите удалить сообщени${number}?`
  },
  mainTitle: 'Мессенджер',
  noMessages: 'Сообщений нет.',
  noMoreMessages: 'Сообщений больше нет.',
  searchPlaceholder: 'Найти чат...',
  shouldUseSearch: 'Используйте поиск, чтобы найти собеседника.',
  typeMessage: 'Введите сообщение',
}
