const oneMB = 1024 * 1024

export enum StatusCode {
  Unauthorized = 401,
}

export enum StorageKeys {
  AccessToken = 'accessToken',
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
