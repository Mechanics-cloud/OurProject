import React from 'react'

import { UserHeaderPopover } from '@/common'
import { MappedData } from '@/features/posts'

type Props = {
  data: MappedData[]
}
export const PostHeaderPopover = ({ data }: Props) => {
  return (
    <UserHeaderPopover>
      <nav>
        <ul className={'flex flex-col gap-3'}>
          {data.map(
            (item) =>
              item.display && (
                <button
                  className={`flex items-center gap-2 hover:text-accent-500`}
                  key={item.id}
                  onClick={item.onClick}
                  type={'button'}
                >
                  {item.icon}
                  <span className={'text-sm'}>{item.text}</span>
                </button>
              )
          )}
        </ul>
      </nav>
    </UserHeaderPopover>
  )
}
