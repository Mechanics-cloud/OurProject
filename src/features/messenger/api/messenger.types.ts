import { ImageFile } from '@/common'

export type ChatsListDTO = {
  items: Message[]
  pageSize: number
  totalCount: number
}

export type Message = {
  avatars: ImageFile[]
  createdAt: string
  id: number
  messageText: string
  messageType: string
  ownerId: number
  receiverId: number
  status: string
  updatedAt: string
  userName: string
}

export type PartnerInfoDTO = { partnerId: number } & Pick<
  Message,
  'avatars' | 'userName'
>

export type PartnerMessagesDTO = {
  items: PartnerMessage[]
  pageSize: number
  totalCount: number
}

export type PartnerMessage = Omit<Message, 'avatars' | 'userName'>

export enum MessengerSocketEvents {
  MESSAGE_DELETED = 'message-deleted',
  MESSAGE_SEND = 'message-sent',
  RECEIVE_MESSAGE = 'receive-message',
  UPDATE_MESSAGE = 'update-message',
}

export type GetMessengerDataArgs = {
  cursor?: number
  pageSize?: number
  signal?: AbortSignal
}

export type GetDialogPartnerMessagesByIdArgs = {
  cursor?: number
  dialogPartnerId: number
  pageSize?: number
  signal?: AbortSignal
}
