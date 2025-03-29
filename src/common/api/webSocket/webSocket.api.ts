import {
  Environments,
  Nullable,
  getFromLocalStorage,
  responseErrorHandler,
} from '@/common'
import { StorageKeys } from '@/common/enums'
import { ManagerOptions, Socket, SocketOptions, io } from 'socket.io-client'

import {
  DisconnectGlobalWSArgsType,
  EventError,
  EventsRegistry,
  GlobalSocketEvents,
  OffArgsByEventName,
  OffArgsByFeatureType,
  OnArgsType,
} from './webSocket.types'

export class WebSocketApi {
  static socket: Nullable<Socket> = null
  private static eventsRegistry: EventsRegistry = {}

  static connectGlobalWS() {
    if (this.socket) {
      return
    }

    const baseUrl = Environments.SOCKET_URL || ''

    const socketOptions: Partial<ManagerOptions & SocketOptions> = {
      query: {
        accessToken: getFromLocalStorage(StorageKeys.AccessToken),
      },
    }

    this.socket = io(baseUrl, socketOptions)
    this.socket.on(GlobalSocketEvents.CONNECT, () => {
      this.reregisterEvents()
    })
    this.socket.on(GlobalSocketEvents.ERROR, (err: EventError) => {
      responseErrorHandler(new Error(err.message))
    })
  }

  static disconnectGlobalWS(args: DisconnectGlobalWSArgsType) {
    if (this.socket) {
      this.offAllListeners(args)
      this.socket.disconnect()
      this.socket = null
    }
  }

  static emit<T = any>(eventName: string, ...args: T[]) {
    if (this.socket && this.socket.connected) {
      this.socket.emit(eventName, ...args)
    } else {
      responseErrorHandler(
        new Error(`Socket not connected, cannot emit: ${eventName}`)
      )
    }
  }

  static offByEventName<T extends string>({
    eventName,
  }: OffArgsByEventName<T>) {
    if (!this.socket) {
      return
    }
    Object.entries(this.eventsRegistry).forEach(([_eventName, _]) => {
      if (_eventName === eventName) {
        this.socket!.off(eventName)
        delete this.eventsRegistry[eventName]
      }
    })
  }

  static offByFeature({ feature }: OffArgsByFeatureType) {
    if (!this.socket) {
      return
    }
    Object.entries(this.eventsRegistry).forEach(([eventName, listener]) => {
      if (listener.feature === feature) {
        this.socket!.off(eventName)
        delete this.eventsRegistry[eventName]
      }
    })
  }

  static on<T extends string>({ callback, eventName, feature }: OnArgsType<T>) {
    if (this.socket && this.socket.connected) {
      this.socket.on(eventName, callback)
    }
    this.eventsRegistry[eventName] = { callback, feature }
  }

  static reinitializeWS() {
    this.disconnectGlobalWS({ shouldSaveEventRegistry: true })
    this.connectGlobalWS()
  }

  private static offAllListeners(args: DisconnectGlobalWSArgsType) {
    this.socket!.off(GlobalSocketEvents.CONNECT)
    this.socket!.off(GlobalSocketEvents.ERROR)
    Object.entries(this.eventsRegistry).forEach(([eventName, _]) => {
      this.socket!.off(eventName)
    })
    if (!args?.shouldSaveEventRegistry) {
      this.eventsRegistry = {}
    }
  }

  private static reregisterEvents() {
    if (this.socket && this.socket.connected) {
      Object.entries(this.eventsRegistry).forEach(
        ([eventName, { callback }]) => {
          this.socket!.on(eventName, callback)
        }
      )
    }
  }
}
