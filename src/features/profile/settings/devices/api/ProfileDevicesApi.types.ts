export type Sessions = {
  current: Device
  others: Device[]
}

type Device = {
  browserName: string
  browserVersion: string
  deviceId: number
  ip: string
  lastActive: string
  osName: string
  osVersion: string
}

export type BrowserNames =
  | 'Chrome'
  | 'Edge'
  | 'Firefox'
  | 'Opera'
  | 'Safari'
  | 'Yandex'
