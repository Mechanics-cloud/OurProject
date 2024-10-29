import { useCallback, useState } from 'react'
import { FieldValues, Path, PathValue, UseFormSetValue } from 'react-hook-form'

import { useClickOutside } from '@/common'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

export const useCalendar = <T extends FieldValues>(
  setValue: UseFormSetValue<T>,
  name: Path<T>
) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false)

  const toggleCalendar = useCallback(() => {
    setIsCalendarOpen((prev) => !prev)
  }, [])

  const calendarRef = useClickOutside(toggleCalendar)

  const onSelectDate = (date: Date) => {
    const formattedDate = format(date, 'dd.MM.yyyy', { locale: ru })

    setValue(name, formattedDate as PathValue<T, Path<T>>, {
      shouldDirty: true,
    })
    setIsCalendarOpen(false)
  }

  return {
    calendarRef,
    isCalendarOpen,
    onSelectDate,
    toggleCalendar,
  }
}
