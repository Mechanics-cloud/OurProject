export const MessengerEndpoints = {
  deleteMessageByMessageId: (messageId: number) => `/v1/messenger/${messageId}`,
  getDialogPartnerMessagesById: (dialogPartnerId: number) =>
    `/v1/messenger/${dialogPartnerId}`,
  getMessengerData: '/v1/messenger',
  markMessagesAsRead: '/v1/messenger',
}
