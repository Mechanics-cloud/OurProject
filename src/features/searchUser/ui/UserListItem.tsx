import avatarPlaceholder from '@/assets/images/user-avatar-placeholder.jpg'
import { PublicPaths, Typography, cn } from '@/common'
import { UserItemInfoDTO } from '@/features/searchUser/api'
import { observer } from 'mobx-react-lite'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  className?: string
  item: UserItemInfoDTO
  set: () => void
}

export const UserListItem = observer(({ className, item, set }: Props) => {
  const { avatars, firstName, id, lastName, userName } = item

  const avatar = avatars.length === 0 ? avatarPlaceholder : avatars[1].url

  return (
    <Link
      className={cn(
        'flex w-full p-3 gap-3 border-b border-t border-dark-300 transition-colors duration-500 hover:bg-dark-100',
        className
      )}
      href={PublicPaths.profileLink(id)}
      onClick={set}
      shallow
    >
      <div
        className={'h-12 aspect-square relative rounded-full overflow-hidden'}
      >
        <Image
          alt={userName}
          height={48}
          src={avatar}
          width={48}
        />
      </div>
      <div className={'flex flex-col flex-1 min-w-0 gap-1'}>
        <div className={'flex flex-col gap-2'}>
          <Typography
            className={
              'whitespace-nowrap overflow-hidden text-ellipsis underline'
            }
            variant={'reg14'}
          >
            {userName}
          </Typography>
          <div className={'flex gap-2'}>
            <Typography variant={'small'}>{firstName}</Typography>
            <Typography variant={'small'}>{lastName}</Typography>
          </div>
        </div>
      </div>
    </Link>
  )
})
