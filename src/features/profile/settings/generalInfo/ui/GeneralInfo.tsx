import React from 'react'

import { Button, FormTextArea, FormTextField, useTranslation } from '@/common'
import {
  AddPhoto,
  FormCalendar,
  SelectCountryAndCity,
  useFillGeneralInfo,
} from '@/features/profile'
import { observer } from 'mobx-react-lite'

export const GeneralInfoComponent = React.forwardRef<HTMLFormElement>(
  (_, ref) => {
    const { t } = useTranslation()
    const {
      control,
      isDirty,
      isPhotoChanged,
      isSubmitting,
      isValid,
      onModalPhotoSave,
      onSubmit,
      photoObj,
      setIsPhotoChanged,
      setPhotoObj,
      setValue,
    } = useFillGeneralInfo()

    return (
      <div
        className={
          'flex gap-10 w-full mt-6 relative after:absolute after:contain-content after:h-[1px] after:top-[90%] after:left-0 after:w-full after:bg-dark-300'
        }
      >
        <AddPhoto
          onModalPhotoSave={onModalPhotoSave}
          photoObj={photoObj}
          setIsPhotoChanged={setIsPhotoChanged}
          setPhotoObj={setPhotoObj}
        />
        <form
          className={'flex gap-10 w-full'}
          onSubmit={onSubmit}
          ref={ref}
        >
          <div className={'w-full flex flex-col gap-6'}>
            <FormTextField
              control={control}
              label={t.profileInputs.userName}
              name={'userName'}
              required
            />
            <FormTextField
              control={control}
              label={t.profileInputs.firstName}
              name={'firstName'}
              required
            />
            <FormTextField
              control={control}
              label={t.profileInputs.lastName}
              name={'lastName'}
              required
            />
            <div className={'flex flex-col'}>
              <FormCalendar
                control={control}
                label={t.profileInputs.dateOfBirth}
                name={'dateOfBirth'}
                setValue={setValue}
              />
              <SelectCountryAndCity control={control} />
            </div>
            <FormTextArea
              control={control}
              label={t.profileInputs.aboutMe}
              name={'aboutMe'}
            />
            <div className={'flex justify-end mt-12'}>
              <Button
                disabled={
                  !isValid || isSubmitting || (!isDirty && !isPhotoChanged)
                }
                type={'submit'}
                variant={'primary'}
              >
                {t.profileInputs.saveChanges}
              </Button>
            </div>
          </div>
        </form>
      </div>
    )
  }
)

export const GeneralInfo = observer(GeneralInfoComponent)
