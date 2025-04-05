import { ScrollArea, Typography, useTranslation } from '@/common'
import { UsersInfoDTO } from '@/features/searchUser/api'
import { UsersListItem } from '@/features/searchUser/ui/usersList/UsersListItem'

type Props = { usersInfo: UsersInfoDTO }
export const UsersList = ({ usersInfo }: Props) => {
  const { t } = useTranslation()

  return (
    <>
      {usersInfo.items.length !== 0 ? (
        <ScrollArea
          className={'w-full mt-8'}
          isPaddingRight={false}
        >
          {usersInfo.items.map((el) => {
            return (
              <UsersListItem
                item={el}
                key={el.id}
              />
            )
          })}
        </ScrollArea>
      ) : (
        <div
          className={'w-full flex flex-col items-center justify-center mt-20'}
        >
          <Typography
            className={'text-light-900 text-pretty text-center'}
            variant={'bold16'}
          >
            {t.search.notFoundUsersTitle}
          </Typography>
          <Typography
            className={'text-light-900 text-pretty text-center'}
            variant={'reg14'}
          >
            {t.search.notFoundUsersText}
          </Typography>
        </div>
      )}
    </>
  )
}
