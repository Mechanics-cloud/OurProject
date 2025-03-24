import { Nullable, responseErrorHandler, tryCatch } from '@/common'
import { WebSocketApi } from '@/common/api'
import { publicProfileAPi } from '@/features/profile'
import { makeAutoObservable, runInAction } from 'mobx'

import {
  ChatsListDTO,
  GetDialogPartnerMessagesByIdArgs,
  GetMessengerDataArgs,
  MessengerSocketEvents,
  PartnerInfoDTO,
  PartnerMessage,
  PartnerMessagesDTO,
  messengerApi,
} from '../../api'

class MessengerStore {
  private partnerId: Nullable<number> = null
  chatsListData: Nullable<ChatsListDTO> = null
  dialogPartnerInfo: Nullable<PartnerInfoDTO> = null
  dialogPartnerMessages: Nullable<PartnerMessagesDTO> = null

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  private clearMessengerStore() {
    this.dialogPartnerInfo = null
    this.dialogPartnerMessages = null
    this.chatsListData = null
  }

  private handleMessageSend(
    message: PartnerMessage,
    acknowledge: (arg: { message: PartnerMessage; receiverId: number }) => void
  ) {
    runInAction(() => {
      acknowledge({ message, receiverId: message.receiverId })
      if (this.dialogPartnerMessages) {
        this.dialogPartnerMessages.items.unshift(message)
        this.getMessengerData()
      }
    })
  }

  private handleReceiveMessage(message: PartnerMessage) {
    runInAction(() => {
      if (this.dialogPartnerMessages) {
        this.dialogPartnerMessages.items.unshift(message)
        this.getMessengerData()
      }
    })
  }

  connectMessengerWSEvents() {
    WebSocketApi.on<MessengerSocketEvents>({
      callback: this.handleReceiveMessage,
      eventName: MessengerSocketEvents.RECEIVE_MESSAGE,
      feature: 'messenger',
    })

    WebSocketApi.on<MessengerSocketEvents>({
      callback: this.handleMessageSend,
      eventName: MessengerSocketEvents.MESSAGE_SEND,
      feature: 'messenger',
    })

    // WebSocketApi.on<MessengerSocketEvents>({
    //   callback: (...message) => {
    //     console.log('UPDATE_MESSAGE', message)
    //   },
    //   eventName: MessengerSocketEvents.UPDATE_MESSAGE,
    //   feature: 'messenger',
    // })
    //
    // WebSocketApi.on<MessengerSocketEvents>({
    //   callback: (...message) => {
    //     console.log('MESSAGE_DELETED', message)
    //   },
    //   eventName: MessengerSocketEvents.MESSAGE_DELETED,
    //   feature: 'messenger',
    // })
  }

  disconnectMessengerWSEvents() {
    WebSocketApi.offByFeature({ feature: 'messenger' })
    this.clearMessengerStore()
  }

  async getDialogPartnerInfo(dialogPartnerId: number, signal?: AbortSignal) {
    if (
      this.dialogPartnerInfo &&
      this.dialogPartnerInfo.partnerId === dialogPartnerId
    ) {
      return
    }
    const { data, error } = await tryCatch(
      publicProfileAPi
        .getPublicUser(String(dialogPartnerId), signal)
        .then((res) => ({
          avatars: res.avatars,
          partnerId: res.id,
          userName: res.userName,
        }))
    )

    runInAction(() => {
      if (data) {
        this.dialogPartnerInfo = data
      } else {
        responseErrorHandler(error)
      }
    })
  }

  async getDialogPartnerMessagesById(args: GetDialogPartnerMessagesByIdArgs) {
    const { data, error } = await tryCatch(
      messengerApi.getDialogPartnerMessagesById(args)
    )

    runInAction(() => {
      if (data) {
        if (!args.cursor) {
          this.dialogPartnerMessages = data
          this.partnerId = args.dialogPartnerId

          return
        }

        if (
          this.dialogPartnerMessages &&
          this.partnerId === args.dialogPartnerId
        ) {
          this.dialogPartnerMessages = {
            ...data,
            items: this.dialogPartnerMessages.items.concat(data.items),
          }
        } else {
          this.dialogPartnerMessages = data
        }
      } else {
        responseErrorHandler(error)
      }
    })
  }
  async getMessengerData(args: GetMessengerDataArgs | void) {
    const { data, error } = await tryCatch(messengerApi.getMessengerData(args))

    runInAction(() => {
      if (data) {
        this.chatsListData = data
      } else {
        responseErrorHandler(error)
      }
    })
  }

  sendWSMessage(message: string, receiverId: number) {
    WebSocketApi.emit(MessengerSocketEvents.RECEIVE_MESSAGE, {
      message,
      receiverId,
    })
  }

  setDialogPartnerInfo(info: PartnerInfoDTO) {
    this.dialogPartnerInfo = info
    this.dialogPartnerMessages = null
    this.partnerId = null
  }
}

export const messengerStore = new MessengerStore()
