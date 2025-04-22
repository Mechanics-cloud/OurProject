import { WebSocketEvents } from '@/common/enums'

type Listener = (...args: any[]) => void

type FeatureType = 'messenger' | 'notification'

export type EventsRegistry = {
  [eventName: string]: {
    callback: Listener
    feature: FeatureType
  }
}

export type OffArgsByFeatureType = {
  feature: FeatureType
}

export type OffArgsByEventName = {
  eventName: WebSocketEvents
}

export type DisconnectGlobalWSArgsType = {
  shouldSaveEventRegistry: boolean
} | void

export type OnArgsType = {
  callback: Listener
  eventName: WebSocketEvents
  feature: FeatureType
}

export type EventError = {
  error: string
  message: string
}
