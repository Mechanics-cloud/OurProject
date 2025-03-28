export const messenger = {
  change: 'Change',
  chooseChatUser: 'Choose who you want to talk to',
  delete: 'Delete',
  deleteConfirm: (count: number) => {
    const number = count > 1 ? 's' : ''

    return `Are you sure you want to delete message${number}?`
  },
  mainTitle: 'Messenger',
  noMessages: 'No messages.',
  noMoreMessages: 'No more messages.',
  searchPlaceholder: 'Find a chat...',
  shouldUseSearch: 'Use search to find a conversation partner.',
  typeMessage: 'Type message',
}
