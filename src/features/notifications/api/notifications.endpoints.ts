export const NotificationsEndpoints = {
  deleteNotifications: (id: number) => `/v1/notifications/${id}`,
  getAllNotifications: (cursor: number) => `/v1/notifications/${cursor}`,
  markAsRead: '/v1/notifications/mark-as-read',
}
