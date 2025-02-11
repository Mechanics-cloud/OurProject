export const NotificationsEndpoints = {
  deleteNotifications: (id: number) => `/api/v1/notifications/${id}`,
  getAllNotifications: (cursor: number) => `/api/v1/notifications/${cursor}`,
  markAsRead: '/api/v1/notifications/mark-as-read',
}
