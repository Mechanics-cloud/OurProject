import React from 'react'

import { CalendarFilled, CalendarOutline } from '@/assets/icons'
import {
  Button,
  Calendar,
  FormTextField,
  SelectItem,
  useTranslation,
} from '@/common'
import { FormSelect } from '@/common/form/FormSelect'
import { FormTextArea } from '@/common/form/FormTextArea'
import { useFillGeneralInfo } from '@/features/profile/settings/generalInfo/model/useFillGeneralInfo'
import { AddPhoto } from '@/features/profile/settings/generalInfo/ui/AddPhoto'
import { observer } from 'mobx-react-lite'

export const GeneralInfo = observer(
  React.forwardRef<HTMLFormElement>((_, ref) => {
    const { t } = useTranslation()
    const {
      calendarRef,
      cities,
      control,
      countriesData,
      countryValue,
      isCalendarOpen,
      isDirty,
      isSubmitting,
      isValid,
      onModalPhotoSave,
      onSelectDate,
      onSubmit,
      photoChanged,
      photoObj,
      toggleCalendar,
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
              <FormTextField
                control={control}
                label={t.profileInputs.dateOfBirth}
                name={'dateOfBirth'}
                readOnly
              >
                {isCalendarOpen ? (
                  <CalendarFilled
                    className={
                      'absolute -translate-y-1/2 top-1/2 stroke-width-1 fill-light-100 right-3 cursor-pointer w-[18px] h-5'
                    }
                    onClick={toggleCalendar}
                  />
                ) : (
                  <CalendarOutline
                    className={
                      'absolute -translate-y-1/2 top-1/2 stroke-width-1 fill-light-100 right-3 cursor-pointer w-[18px] h-5'
                    }
                    onClick={toggleCalendar}
                  />
                )}
                <div ref={calendarRef}>
                  {isCalendarOpen && (
                    <Calendar
                      className={'absolute'}
                      onDayClick={onSelectDate}
                    />
                  )}
                </div>
              </FormTextField>
              <div className={'flex gap-6'}>
                <FormSelect
                  className={'w-full'}
                  control={control}
                  label={t.profileInputs.country}
                  name={'country'}
                  placeholder={t.profileInputs.placeholders.country}
                >
                  {countriesData?.map((country) => (
                    <SelectItem
                      key={country.country}
                      value={country.country}
                    >
                      {country.country}
                    </SelectItem>
                  ))}
                </FormSelect>
                <FormSelect
                  className={'w-full'}
                  control={control}
                  disabled={!countryValue}
                  label={t.profileInputs.city}
                  name={'city'}
                  placeholder={t.profileInputs.placeholders.city}
                >
                  {cities?.map((city) => (
                    <SelectItem
                      key={city}
                      value={city}
                    >
                      {city}
                    </SelectItem>
                  ))}
                </FormSelect>
              </div>
            </div>
            <FormTextArea
              control={control}
              label={t.profileInputs.aboutMe}
              name={'aboutMe'}
            />
            <div className={'flex justify-end mt-12'}>
              <Button
                disabled={
                  !isValid || isSubmitting || (!isDirty && !photoChanged)
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
  })
)
