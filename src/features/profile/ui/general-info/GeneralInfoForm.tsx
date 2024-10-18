import React from 'react'

import CalendarFilled from '@/assets/icons/filledIcons/CalendarFilled'
import CalendarOutline from '@/assets/icons/outlineIcons/CalendarOutline'
import { Button, Calendar, FormTextField, SelectItem } from '@/common'
import { FormSelect } from '@/common/form/FormSelect'
import { FormTextArea } from '@/common/form/FormTextArea'
import { useFillGeneralForm } from '@/features/profile/model/useFillGeneralForm'

export const GeneralInfoForm = React.forwardRef<HTMLFormElement>((_, ref) => {
  const {
    calendarRef,
    cities,
    control,
    countriesData,
    countryValue,
    handleSubmit,
    isCalendarOpen,
    isSubmitting,
    isValid,
    onSubmit,
    selectDateHandler,
    toggleCalendar,
  } = useFillGeneralForm()

  return (
    <form
      className={'w-full flex flex-col gap-6'}
      onSubmit={handleSubmit(onSubmit)}
      ref={ref}
    >
      <FormTextField
        control={control}
        label={'Username'}
        name={'username'}
        required
      />
      <FormTextField
        control={control}
        label={'First Name'}
        name={'firstName'}
        required
      />
      <FormTextField
        control={control}
        label={'Last Name'}
        name={'lastName'}
        required
      />
      <div className={'flex flex-col'}>
        <FormTextField
          control={control}
          label={'Date of Birth'}
          name={'date'}
          readOnly
        >
          {!isCalendarOpen ? (
            <CalendarOutline
              className={
                'absolute -translate-y-1/2 top-1/2 stroke-width-1 fill-light-100 right-3 cursor-pointer w-[18px] h-5'
              }
              onClick={toggleCalendar}
            />
          ) : (
            <CalendarFilled
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
            label={'Select your country'}
            name={'country'}
            placeholder={'Country'}
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
            label={'Select your city'}
            name={'city'}
            placeholder={'City'}
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
        label={'About me'}
        name={'aboutMe'}
      />
      <div className={'flex justify-end mt-12'}>
        <Button
          // className={
          //   'relative before:absolute before:contain-content before:h-[1px] before:top-[50%] before:left-[50%] before:w-full before:bg-accent-500'
          // }
          disabled={!isValid || isSubmitting}
          type={'submit'}
          variant={'primary'}
        >
          Save Changes
        </Button>
      </div>
    </form>
  )
})
