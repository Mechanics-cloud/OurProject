import { WebSocketApi } from '@/common/api'
import { WebSocketEvents } from '@/common/enums'
import {
  PartnerMessage,
  SendWSMessagesPayload,
  UpdateWSMessagesPayload,
} from '@/features/messenger/api'
import { BaseMessengerStore } from '@/features/messenger/model/store/baseMessengerStore'
import { action, makeObservable, runInAction } from 'mobx'

export class ChatWSStore extends BaseMessengerStore {
  constructor() {
    super()
    makeObservable<
      ChatWSStore,
      'handleMessageDelete' | 'handleMessageSend' | 'handleReceiveMessage'
    >(this, {
      connectMessengerWSEvents: action.bound,
      disconnectMessengerWSEvents: action.bound,
      handleMessageDelete: action.bound,
      handleMessageSend: action.bound,
      handleReceiveMessage: action.bound,
      sendWSMessage: action.bound,
      updateWSMessage: action.bound,
    })
  }

  private handleMessageDelete(messageId: number) {
    runInAction(() => {
      if (!this.dialogPartnerMessages) {
        return
      }
      this.getMessengerData()
      this.dialogPartnerMessages.items =
        this.dialogPartnerMessages.items.filter(
          (message) => message.id !== messageId
        )
    })
  }

  private handleMessageSend(
    message: PartnerMessage,
    acknowledge: (arg: { message: PartnerMessage; receiverId: number }) => void
  ) {
    runInAction(() => {
      acknowledge({ message, receiverId: message.receiverId })
      this.getMessengerData()
      this.hasNewMessage = message.ownerId
      const ownerId = this.dialogPartnerMessages?.items[0].ownerId
      const receiverId = this.dialogPartnerMessages?.items[0].receiverId

      if (
        !this.dialogPartnerMessages ||
        (message.ownerId !== ownerId && message.ownerId !== receiverId)
      ) {
        return
      }

      this.markMessagesAsRead([message.id])
      this.dialogPartnerMessages.items.unshift(message)
      this.hasNewMessage = null
    })
  }

  private handleReceiveMessage(message: PartnerMessage | PartnerMessage[]) {
    runInAction(() => {
      if (!this.dialogPartnerMessages) {
        return
      }
      this.getMessengerData()
      if (Array.isArray(message)) {
        const ids = message.map((item) => item.id)

        this.dialogPartnerMessages.items = this.dialogPartnerMessages.items.map(
          (item) => (ids.includes(item.id) ? { ...item, status: 'READ' } : item)
        )
        this.hasNewMessage = null

        return
      } else {
        const containIndex = this.dialogPartnerMessages.items.findIndex(
          (el) => el.id === message.id
        )

        if (containIndex !== -1) {
          this.dialogPartnerMessages.items[containIndex] = message
        } else {
          this.dialogPartnerMessages.items.unshift(message)
        }
      }
    })
  }

  connectMessengerWSEvents() {
    WebSocketApi.on({
      callback: this.handleReceiveMessage,
      eventName: WebSocketEvents.RECEIVE_MESSAGE,
      feature: 'messenger',
    })

    WebSocketApi.on({
      callback: this.handleMessageSend,
      eventName: WebSocketEvents.MESSAGE_SEND,
      feature: 'messenger',
    })

    WebSocketApi.on({
      callback: this.handleMessageDelete,
      eventName: WebSocketEvents.MESSAGE_DELETED,
      feature: 'messenger',
    })
  }

  disconnectMessengerWSEvents() {
    WebSocketApi.offByFeature({ feature: 'messenger' })
  }

  sendWSMessage(message: string, receiverId: number) {
    WebSocketApi.emit<SendWSMessagesPayload>(WebSocketEvents.RECEIVE_MESSAGE, {
      message,
      receiverId,
    })
  }

  updateWSMessage(messageText: string, messageId: number) {
    WebSocketApi.emit<UpdateWSMessagesPayload>(WebSocketEvents.UPDATE_MESSAGE, {
      id: messageId,
      message: messageText,
    })
  }
}
