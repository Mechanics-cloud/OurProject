import * as React from 'react'

import { PageButton } from './PageButton'

type Props = {}

export const Pagination = (props: Props) => {
  return (
    <div className={'flex gap-x-3'}>
      <PageButton
        onClick={() => {}}
        page={1}
      />
      <PageButton
        onClick={() => {}}
        page={1}
        selected
      />
      <PageButton
        disabled
        onClick={() => {}}
        page={1}
      />
    </div>
  )
}
