import { Nullable, tryCatch } from '@/common'
import { generalStore } from '@/core/store'
import {
  ChatsListDTO,
  GetDialogPartnerMessagesByIdArgs,
  GetMessengerDataArgs,
  PartnerInfoDTO,
  PartnerMessagesDTO,
  messengerApi,
} from '@/features/messenger/api'
import { publicProfileAPi } from '@/features/profile'
import { action, makeObservable, observable, runInAction } from 'mobx'

export class BaseMessengerStore {
  private partnerId: Nullable<number> = null
  chatsListData: Nullable<ChatsListDTO> = null
  dialogPartnerInfo: Nullable<PartnerInfoDTO> = null
  dialogPartnerMessages: Nullable<PartnerMessagesDTO> = null
  hasNewMessage: Nullable<number> = null
  isChatLoading: boolean = true
  isLoading: boolean = true
  searchName: string = ''

  constructor() {
    makeObservable<BaseMessengerStore, 'getDialogPartnerInfo' | 'partnerId'>(
      this,
      {
        chatsListData: observable,
        clearMessengerStore: action.bound,
        deleteMessageByMessageId: action.bound,
        dialogPartnerInfo: observable,
        dialogPartnerMessages: observable,
        getDialogPartnerInfo: action.bound,
        getDialogPartnerMessagesById: action.bound,
        getMessengerData: action.bound,
        hasNewMessage: observable,
        isChatLoading: observable,
        isLoading: observable,
        markMessagesAsRead: action.bound,
        partnerId: observable,
        searchName: observable,
        setDialogPartnerInfo: action.bound,
        setSearchName: action.bound,
      }
    )
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

  clearMessengerStore() {
    this.dialogPartnerInfo = null
    this.dialogPartnerMessages = null
    this.partnerId = null
    this.isLoading = true
    this.isChatLoading = true
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

    await this.getMessengerData({ searchName: this.searchName })

    runInAction(() => {
      if (this.dialogPartnerMessages) {
        this.dialogPartnerMessages.items =
          this.dialogPartnerMessages.items.filter(
            (el) => !result.includes(el.id)
          )
      }
    })
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

  setDialogPartnerInfo(info: PartnerInfoDTO) {
    this.isChatLoading = true
    this.dialogPartnerInfo = info
    this.dialogPartnerMessages = null
    this.partnerId = null
  }

  setSearchName(name: string) {
    this.searchName = name
  }
}
