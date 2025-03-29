export const MessengerEndpoints = {
  deleteMessageByMessageId: (messageId: number) => `/v1/messanger/${messageId}`,
  getDialogPartnerMessagesById: (dialogPartnerId: number) =>
    `/v1/messanger/${dialogPartnerId}`,
  getMessengerData: '/v1/messanger',
  markMessagesAsRead: '/v1/messanger',
}
