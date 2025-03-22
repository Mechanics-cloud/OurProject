import { instance } from '@/common/api'
import { MessengerEndpoints } from '@/features/messenger/api/messenger.endpoints'
import {
  ChatsListDTO,
  GetDialogPartnerMessagesByIdArgs,
  GetMessengerDataArgs,
  PartnerMessagesDTO,
} from '@/features/messenger/api/messenger.types'
import { AxiosInstance } from 'axios'

class MessengerApi {
  constructor(private instance: AxiosInstance) {}

  async getDialogPartnerMessagesById(
    args: GetDialogPartnerMessagesByIdArgs
  ): Promise<PartnerMessagesDTO> {
    const res = await this.instance.get(
      MessengerEndpoints.getDialogPartnerMessagesById(args.dialogPartnerId),
      {
        params: {
          cursor: args.cursor,
          pageSize: args.pageSize || 10,
        },
        signal: args.signal,
      }
    )

    return res.data
  }
  async getMessengerData(
    args: GetMessengerDataArgs | void
  ): Promise<ChatsListDTO> {
    const res = await this.instance.get(MessengerEndpoints.getMessengerData, {
      params: {
        cursor: args?.cursor,
        pageSize: args?.pageSize || 10,
      },
      signal: args?.signal,
    })

    return res.data
  }
}

export const messengerApi = new MessengerApi(instance)
