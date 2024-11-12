import React from 'react'

import { Button, Skeleton } from '@/common'

export const GeneralInfoLoading = () => {
  const fieldClass = 'w-full h-[36px] mb-6 mt-5'

  return (
    <div
      className={
        'flex gap-10 w-full mt-6 relative after:absolute after:contain-content after:h-[1px] after:top-[90%] after:left-0 after:w-full after:bg-dark-300'
      }
    >
      <div className={'flex items-center flex-col h-[500px] gap-6'}>
        <Skeleton className={'rounded-full pr-0 w-[200px] h-[200px]'} />
        <Button
          className={'min-w-[196px]'}
          disabled
          variant={'outline'}
        >
          Add a Profile Photo
        </Button>
      </div>
      <div className={'w-full flex flex-col gap-6'}>
        <div className={'w-full flex flex-col gap-6'}>
          <Skeleton className={fieldClass} />
          <Skeleton className={fieldClass} />
          <Skeleton className={fieldClass} />
          <Skeleton className={fieldClass} />
          <div className={'flex gap-2'}>
            <Skeleton className={'w-full h-[36px]'} />
            <Skeleton className={'w-full h-[36px]'} />
          </div>
          <Skeleton className={'w-full h-[60px]'} />
          <div className={'flex justify-end mt-12'}>
            <Button
              disabled
              variant={'primary'}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
