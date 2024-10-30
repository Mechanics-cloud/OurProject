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

// export type DeviceType = 'chrome' | 'desktop' | 'mobile'
export type BrowserNames = 'Chrome' | 'Firefox' | 'mobile'
