export const oneMB = 1024 * 1024

export enum StatusCode {
  Unauthorized = 401,
}

export enum StorageKeys {
  AccessToken = 'accessToken',
  ScrollPosition = 'scrollPosition',
}

export enum ScreenWidths {
  lg = 1024,
  md = 768,
  sm = 500,
}

export enum FileSizes {
  PostPhotoSize = 20 * oneMB,
  UserPhotoSize = 10 * oneMB,
}

export enum LikeStatus {
  Dislike = 'DISLIKE',
  Like = 'LIKE',
  None = 'NONE',
}

export enum PaymentType {
  Day = 'DAY',
  Monthly = 'MONTHLY',
  Weekly = 'WEEKLY',
}

export enum AccountTypeValue {
  Business = 'business',
  Personal = 'personal',
}

export enum PaymentBanks {
  Paypal = 'PAYPAL',
  Stripe = 'STRIPE',
}
export enum ManualAccountType {
  AccountType = 'accountType',
  paymentCookies = 'payment=',
}

export enum WebSocketEvents {
  CONNECT = 'connect',
  ERROR = 'error',
  MESSAGE_DELETED = 'message-deleted',
  MESSAGE_SEND = 'message-send',
  NOTIFICATIONS = 'notifications',
  RECEIVE_MESSAGE = 'receive-message',
  UPDATE_MESSAGE = 'update-message',
}
