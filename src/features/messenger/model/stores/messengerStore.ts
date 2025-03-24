import { Nullable, responseErrorHandler, tryCatch } from '@/common'
import { WebSocketApi } from '@/common/api'
import {
  ChatsListDTO,
  GetDialogPartnerMessagesByIdArgs,
  GetMessengerDataArgs,
  MessengerSocketEvents,
  PartnerInfoDTO,
  PartnerMessage,
  PartnerMessagesDTO,
  messengerApi,
} from '@/features/messenger/api'
import { publicProfileAPi } from '@/features/profile'
import { makeAutoObservable, runInAction } from 'mobx'

class MessengerStore {
  // isLoading: boolean = false
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
      if (messengerStore.dialogPartnerMessages) {
        messengerStore.dialogPartnerMessages.items.unshift(message)
      }
    })
  }

  private handleReceiveMessage(message: PartnerMessage) {
    runInAction(() => {
      if (messengerStore.dialogPartnerMessages) {
        messengerStore.dialogPartnerMessages.items.unshift(message)
      }
    })
  }

  connectMessengerWSEvents() {
    WebSocketApi.on({
      callback: this.handleReceiveMessage,
      eventName: MessengerSocketEvents.RECEIVE_MESSAGE,
      feature: 'messenger',
    })

    WebSocketApi.on({
      callback: this.handleMessageSend,
      eventName: MessengerSocketEvents.MESSAGE_SEND,
      feature: 'messenger',
    })

    // this.socket.on(GlobalSocketEvents.UPDATE_MESSAGE, (...message) => {
    //   console.log('UPDATE_MESSAGE', message)
    // })
    // this.socket.on(GlobalSocketEvents.MESSAGE_DELETED, (...message) => {
    //   console.log('MESSAGE_DELETED', message)
    // })
  }

  disconnectMessengerWSEvents() {
    WebSocketApi.off({ feature: 'messenger' })
    this.clearMessengerStore()
  }

  async getDialogPartnerInfo(dialogPartnerId: number, signal?: AbortSignal) {
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
        this.dialogPartnerMessages = data
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
  }
}

export const messengerStore = new MessengerStore()
