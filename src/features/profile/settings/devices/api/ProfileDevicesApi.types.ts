export type Sessions = {
  current: DeviceType
  others: DeviceType[]
}

export type DeviceType = {
  browserName: BrowserNames
  browserVersion: string
  deviceId: number
  ip: string
  lastActive: string
  osName: string
  osVersion: string
}

export type BrowserNames =
  | 'Chrome'
  | 'Desktop'
  | 'Edge'
  | 'Firefox'
  | 'Opera'
  | 'Safari'
  | 'Yandex'
