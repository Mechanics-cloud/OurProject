import { Nullable, responseErrorHandler, tryCatch } from '@/common'
import { WebSocketApi } from '@/common/api'
import { publicProfileAPi } from '@/features/profile'
import { makeAutoObservable, runInAction } from 'mobx'

import {
  ChatsListDTO,
  DeleteMessageByMessageIdArgs,
  GetDialogPartnerMessagesByIdArgs,
  GetMessengerDataArgs,
  MessengerSocketEvents,
  PartnerInfoDTO,
  PartnerMessage,
  PartnerMessagesDTO,
  SendWSMessagesPayload,
  UpdateWSMessagesPayload,
  messengerApi,
} from '../../api'

class MessengerStore {
  private partnerId: Nullable<number> = null
  chatsListData: Nullable<ChatsListDTO> = null
  dialogPartnerInfo: Nullable<PartnerInfoDTO> = null
  dialogPartnerMessages: Nullable<PartnerMessagesDTO> = null
  isChatLoading: boolean = true
  isLoading: boolean = true
  searchName: string = ''

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  private clearMessengerStore() {
    this.dialogPartnerInfo = null
    this.dialogPartnerMessages = null
    this.chatsListData = null
    this.partnerId = null
    this.isLoading = true
    this.isChatLoading = true
  }

  private async getDialogPartnerInfo(
    dialogPartnerId: number,
    signal?: AbortSignal
  ) {
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

  private handleMessageDelete(messageId: number) {
    runInAction(() => {
      if (!this.dialogPartnerMessages) {
        return
      }
      debugger
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
      if (!this.dialogPartnerMessages) {
        return
      }
      this.dialogPartnerMessages.items.unshift(message)
      this.getMessengerData()
    })
  }

  private handleReceiveMessage(message: PartnerMessage) {
    runInAction(() => {
      if (!this.dialogPartnerMessages) {
        return
      }
      const containIndex = this.dialogPartnerMessages.items.findIndex(
        (el) => el.id === message.id
      )

      if (containIndex !== -1) {
        this.dialogPartnerMessages.items[containIndex] = message

        return
      }

      this.dialogPartnerMessages.items.unshift(message)
      this.getMessengerData()
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

    WebSocketApi.on<MessengerSocketEvents>({
      callback: this.handleMessageDelete,
      eventName: MessengerSocketEvents.MESSAGE_DELETED,
      feature: 'messenger',
    })
  }

  async deleteMessageByMessageId(args: DeleteMessageByMessageIdArgs) {
    const { error } = await tryCatch(
      messengerApi.deleteMessageByMessageId(args)
    )

    if (error) {
      responseErrorHandler(error)
    }
  }

  disconnectMessengerWSEvents() {
    WebSocketApi.offByFeature({ feature: 'messenger' })
    this.clearMessengerStore()
  }

  async getDialogPartnerMessagesById(
    args: { dialogPartnerId?: number } & GetDialogPartnerMessagesByIdArgs
  ) {
    if (!args.dialogPartnerId) {
      this.isChatLoading = false

      return
    }
    await this.getDialogPartnerInfo(args.dialogPartnerId, args.signal)

    const { data, error } = await tryCatch(
      messengerApi.getDialogPartnerMessagesById({
        ...args,
        dialogPartnerId: args.dialogPartnerId,
      })
    )

    runInAction(() => {
      if (data) {
        if (!args.cursor) {
          this.dialogPartnerMessages = data
          this.partnerId = args.dialogPartnerId!
          this.isChatLoading = false

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
      this.isChatLoading = false
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
      this.isLoading = false
    })
  }
  sendWSMessage(message: string, receiverId: number) {
    WebSocketApi.emit<SendWSMessagesPayload>(
      MessengerSocketEvents.RECEIVE_MESSAGE,
      {
        message,
        receiverId,
      }
    )
  }

  setDialogPartnerInfo(info: PartnerInfoDTO) {
    this.isChatLoading = true
    this.dialogPartnerInfo = info
    this.dialogPartnerMessages = null
    this.partnerId = null
  }
  updateWSMessage(messageText: string, messageId: number) {
    WebSocketApi.emit<UpdateWSMessagesPayload>(
      MessengerSocketEvents.UPDATE_MESSAGE,
      {
        id: messageId,
        message: messageText,
      }
    )
  }

  get getFilteredChatList() {
    if (!this.chatsListData) {
      return null
    }

    if (!this.searchName.trim()) {
      return this.chatsListData.items
    }

    return this.chatsListData.items.filter((item) =>
      item.userName.toLowerCase().includes(this.searchName.toLowerCase())
    )
  }
}

export const messengerStore = new MessengerStore()
