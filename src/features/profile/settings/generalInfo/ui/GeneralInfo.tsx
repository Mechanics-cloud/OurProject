import { forwardRef } from 'react'

import {
  Button,
  FormTextArea,
  FormTextField,
  useScreenWidth,
  useTranslation,
} from '@/common'
import {
  AddPhoto,
  FormCalendar,
  SelectCountryAndCity,
  useFillGeneralInfo,
} from '@/features/profile'
import { observer } from 'mobx-react-lite'

export const GeneralInfoComponent = forwardRef<HTMLFormElement>((_, ref) => {
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
  } = useFillGeneralInfo(t)
  const { isTablet } = useScreenWidth()

  return (
    <div
      className={
        'flex flex-col lg:flex-row gap-10 w-full mt-6 relative after:absolute after:contain-content after:h-[1px] after:bottom-[5%] lg:after:top-[90%] after:left-0 after:w-full after:bg-dark-300'
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
        <div className={'w-full flex flex-col lg:gap-6'}>
          <FormTextField
            control={control}
            label={t.profileSettings.userName}
            name={'userName'}
            required
          />
          <FormTextField
            control={control}
            label={t.profileSettings.firstName}
            name={'firstName'}
            required
          />
          <FormTextField
            control={control}
            label={t.profileSettings.lastName}
            name={'lastName'}
            required
          />
          <div className={'flex flex-col'}>
            <FormCalendar
              control={control}
              label={t.profileSettings.dateOfBirth}
              name={'dateOfBirth'}
              setValue={setValue}
            />
            <SelectCountryAndCity control={control} />
          </div>
          <FormTextArea
            control={control}
            label={t.profileSettings.aboutMe}
            name={'aboutMe'}
          />
          <div className={'flex justify-end mt-12'}>
            <Button
              className={isTablet ? 'w-full' : ''}
              disabled={
                !isValid || isSubmitting || (!isDirty && !isPhotoChanged)
              }
              type={'submit'}
              variant={'primary'}
            >
              {t.profileSettings.saveChanges}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
})

export const GeneralInfo = observer(GeneralInfoComponent)
