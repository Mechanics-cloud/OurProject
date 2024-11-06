import React from 'react'
import { Control, FieldValues, Path, UseFormSetValue } from 'react-hook-form'

import { CalendarFilled, CalendarOutline } from '@/assets/icons'
import { Calendar, FormTextField } from '@/common'
import { useCalendar } from '@/features/profile'

type Props<T extends FieldValues> = {
  control: Control<T>
  label?: string
  name: Path<T>
  setValue: UseFormSetValue<T>
}
export const FormCalendar = <T extends FieldValues>({
  control,
  label,
  name,
  setValue,
}: Props<T>) => {
  const { calendarRef, isCalendarOpen, onSelectDate, toggleCalendar } =
    useCalendar(setValue, name)

  return (
    <div className={'relative'}>
      <FormTextField
        control={control}
        label={label ?? ''}
        name={name}
      ></FormTextField>

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
            className={'absolute top-[75%]'}
            onDayClick={onSelectDate}
          />
        )}
      </div>
    </div>
  )
}
