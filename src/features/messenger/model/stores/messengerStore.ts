import { Nullable, tryCatch } from '@/common'
import { WebSocketApi } from '@/common/api'
import { generalStore } from '@/core/store'
import {
  ChatsListDTO,
  GetDialogPartnerMessagesByIdArgs,
  GetMessengerDataArgs,
  MessengerSocketEvents,
  PartnerInfoDTO,
  PartnerMessage,
  PartnerMessagesDTO,
  SendWSMessagesPayload,
  UpdateWSMessagesPayload,
  messengerApi,
} from '@/features/messenger/api'
import { publicProfileAPi } from '@/features/profile'
import { makeAutoObservable, runInAction } from 'mobx'

class MessengerStore {
  private partnerId: Nullable<number> = null
  chatsListData: Nullable<ChatsListDTO> = null
  dialogPartnerInfo: Nullable<PartnerInfoDTO> = null
  dialogPartnerMessages: Nullable<PartnerMessagesDTO> = null
  hasNewMessage: Nullable<number> = null
  isChatLoading: boolean = true
  isLoading: boolean = true
  searchName: string = ''

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
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
    const { data } = await tryCatch(
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
      }
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

  clearMessengerStore() {
    this.dialogPartnerInfo = null
    this.dialogPartnerMessages = null
    this.partnerId = null
    this.isLoading = true
    this.isChatLoading = true
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

  async deleteMessageByMessageId(messagesIds: number[]) {
    if (!this.dialogPartnerMessages) {
      return
    }

    const result = await Promise.all(
      messagesIds.map(async (id) => {
        const { data } = await tryCatch(
          messengerApi.deleteMessageByMessageId(id)
        )

        if (!data) {
          return null
        }

        return data
      })
    )

    await this.getMessengerData()

    runInAction(() => {
      if (this.dialogPartnerMessages) {
        this.dialogPartnerMessages.items =
          this.dialogPartnerMessages.items.filter(
            (el) => !result.includes(el.id)
          )
      }
    })
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

    const { data } = await tryCatch(
      messengerApi.getDialogPartnerMessagesById({
        ...args,
        dialogPartnerId: args.dialogPartnerId,
      })
    )

    if (data) {
      const ids = data.items.reduce<number[]>((acc, item) => {
        if (item.ownerId === args.dialogPartnerId && item.status !== 'READ') {
          acc.push(item.id)
        }

        return acc
      }, [])

      if (ids.length) {
        await this.markMessagesAsRead(ids)
      }
    }

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
      }
      this.isChatLoading = false
    })
  }

  async getMessengerData(args: GetMessengerDataArgs | void) {
    this.isLoading = true
    const { data } = await tryCatch(messengerApi.getMessengerData(args))

    runInAction(() => {
      if (data) {
        if (args?.isInitialRequest) {
          const userId = generalStore.user?.userId
          const newMessage = data.items.find(
            (item) => item.status !== 'READ' && item.ownerId !== userId
          )

          if (newMessage) {
            this.hasNewMessage = newMessage.ownerId
          }
        }

        this.chatsListData = data
      }
      this.isLoading = false
    })
  }

  async markMessagesAsRead(ids?: number[]) {
    if (!ids) {
      return
    }
    await tryCatch(messengerApi.markMessagesAsRead(ids))
    runInAction(() => {
      this.hasNewMessage = null
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
  setSearchName(name: string) {
    this.searchName = name
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
