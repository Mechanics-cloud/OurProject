import { TextUnfolding } from '@/common'
import { Comment } from '@/features/posts'
import { observer } from 'mobx-react-lite'
import Image from 'next/image'
import avatarPlaceholder from 'src/assets/images/user-avatar-placeholder.jpg'

import { LinkProfile } from './LinkProfile'

//TODO доработать или заменить (для постов в открытом окне, когда перейдем ко всем постам)
export const PostDescription = observer(({ item }: { item: Comment }) => {
  return (
    <div className={'max-h-[300px] '}>
      <div className={'inline-block'}>
        <Image
          alt={'Avatar'}
          className={'size-9 rounded-full mt-[5px]'}
          height={36}
          src={
            item.from.avatars ? item.from.avatars[1]?.url : avatarPlaceholder
          }
          width={36}
        />
      </div>
      <div className={'inline-block w-[500px]'}>
        <TextUnfolding
          charactersToShow={170}
          className={'break-words'}
          link={
            <LinkProfile
              userId={item.from.id}
              userName={item.from.username}
            />
          }
        >
          {item.content}
        </TextUnfolding>
      </div>
    </div>
  )
})
