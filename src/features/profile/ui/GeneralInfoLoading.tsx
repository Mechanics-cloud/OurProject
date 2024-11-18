import React from 'react'

import { Button, Skeleton, useTranslation } from '@/common'

export const GeneralInfoLoading = () => {
  const fieldClass = 'w-full h-[36px] mb-6'
  const { t } = useTranslation()
  const {
    aboutMe,
    addProfilePhoto,
    city,
    country,
    dateOfBirth,
    firstName,
    lastName,
    userName,
  } = t.profileInputs

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
          {addProfilePhoto}
        </Button>
      </div>
      <div className={'w-full flex flex-col gap-6'}>
        <label>
          <p className={'mb-1 text-[14px] text-light-900'}>
            {userName}
            <span className={'text-danger-500 ml-1'}>*</span>
          </p>
          <Skeleton className={fieldClass} />
        </label>
        <label>
          <p className={'mb-1 text-[14px] text-light-900'}>
            {firstName}
            <span className={'text-danger-500 ml-1'}>*</span>
          </p>
          <Skeleton className={fieldClass} />
        </label>
        <label>
          <p className={'mb-1 text-[14px] text-light-900'}>
            {lastName}
            <span className={'text-danger-500 ml-1'}>*</span>
          </p>
          <Skeleton className={fieldClass} />
        </label>
        <label>
          <p className={'mb-1 text-[14px] text-light-900'}>{dateOfBirth}</p>
          <Skeleton className={fieldClass} />
        </label>

        <div className={'flex gap-6'}>
          <label className={'w-full'}>
            <p className={'mb-1 text-[14px] text-light-900'}>{country}</p>
            <Skeleton className={'w-full h-[36px]'} />
          </label>
          <label className={'w-full'}>
            <p className={'mb-1 text-[14px] text-light-900'}>{city}</p>
            <Skeleton className={'w-full h-[36px]'} />
          </label>
        </div>
        <label className={'w-full'}>
          <p className={'mb-1 text-[14px] text-light-900'}>{aboutMe}</p>
          <Skeleton className={'w-full h-[60px]'} />
        </label>
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
  )
}
