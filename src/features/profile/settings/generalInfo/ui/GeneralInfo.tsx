import React from 'react'

import CalendarFilled from '@/assets/icons/filledIcons/CalendarFilled'
import CalendarOutline from '@/assets/icons/outlineIcons/CalendarOutline'
import { Button, Calendar, FormTextField, SelectItem } from '@/common'
import { FormSelect } from '@/common/form/FormSelect'
import { FormTextArea } from '@/common/form/FormTextArea'
import { useFillGeneralForm } from '@/features/profile/settings/generalInfo/model/useFillGeneralForm'
import { AddPhoto } from '@/features/profile/settings/generalInfo/ui/AddPhoto'
import { observer } from 'mobx-react-lite'

export const GeneralInfo = observer(
  React.forwardRef<HTMLFormElement>((_, ref) => {
    const {
      calendarRef,
      cities,
      control,
      countriesData,
      countryValue,
      handleSubmit,
      isCalendarOpen,
      isDirty,
      isSubmitting,
      isValid,
      onModalPhotoSave,
      onSubmit,
      photoObj,
      selectDateHandler,
      t,
      toggleCalendar,
    } = useFillGeneralForm()

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
          onSubmit={handleSubmit(onSubmit)}
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
                {isCalendarOpen && (
                  <div ref={calendarRef}>
                    <Calendar
                      className={'absolute'}
                      onDayClick={selectDateHandler}
                    />
                  </div>
                )}
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
                disabled={!isValid || isSubmitting || !isDirty}
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
