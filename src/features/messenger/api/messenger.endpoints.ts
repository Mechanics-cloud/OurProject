export const MessengerEndpoints = {
  getDialogPartnerMessagesById: (dialogPartnerId: number) =>
    `/v1/messanger/${dialogPartnerId}`,

  getMessengerData: '/v1/messanger',
}
