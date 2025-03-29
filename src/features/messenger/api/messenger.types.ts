import { BaseData, ImageFile } from '@/common'

export type ChatsListDTO = {
  items: MessageDTO[]
  pageSize: number
  totalCount: number
}

type MessageStatus = 'READ' | 'RECEIVED' | 'SEND'

export type MessageDTO = {
  avatars: ImageFile[]
  messageText: string
  messageType: string
  receiverId: number
  status: MessageStatus
} & BaseData

export type PartnerInfoDTO = { partnerId: number } & Pick<
  MessageDTO,
  'avatars' | 'userName'
>

export type PartnerMessagesDTO = {
  items: PartnerMessage[]
  pageSize: number
  totalCount: number
}

export type PartnerMessage = Omit<MessageDTO, 'avatars' | 'userName'>

export enum MessengerSocketEvents {
  MESSAGE_DELETED = 'message-deleted',
  MESSAGE_SEND = 'message-sent',
  RECEIVE_MESSAGE = 'receive-message',
  UPDATE_MESSAGE = 'update-message',
}

export type GetMessengerDataArgs = {
  cursor?: number
  isInitialRequest?: boolean
  pageSize?: number
  signal?: AbortSignal
}

export type GetDialogPartnerMessagesByIdArgs = {
  cursor?: number
  pageSize?: number
  signal?: AbortSignal
}

export type SendWSMessagesPayload = {
  message: string
  receiverId: number
}

export type UpdateWSMessagesPayload = {
  id: number
  message: string
}
