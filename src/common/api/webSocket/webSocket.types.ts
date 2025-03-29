export enum GlobalSocketEvents {
  CONNECT = 'connect',
  ERROR = 'error',
}

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

export type OffArgsByEventName<E> = {
  eventName: GlobalCustomEventsType<E>
}

export type DisconnectGlobalWSArgsType = {
  shouldSaveEventRegistry: boolean
} | void

type GlobalCustomEventsType<T> = GlobalSocketEvents | T

export type OnArgsType<E> = {
  callback: Listener
  eventName: GlobalCustomEventsType<E>
  feature: FeatureType
}

export type EventError = {
  error: string
  message: string
}
