import { useEffect, useRef, useState } from 'react'
import { FieldValues, Path, PathValue, UseFormSetValue } from 'react-hook-form'

import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

export const useHandleCalendar = <T extends FieldValues>(
  setValue: UseFormSetValue<T>,
  name: Path<T>
) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false)
  const calendarRef = useRef<HTMLDivElement>(null)

  const toggleCalendar = () => {
    setIsCalendarOpen((prev) => !prev)
  }

  const calendarOutsideClickHandler = (e: MouseEvent) => {
    if (
      calendarRef.current &&
      !calendarRef.current.contains(e.target as Node)
    ) {
      setIsCalendarOpen(false)
    }
  }

  useEffect(() => {
    if (isCalendarOpen) {
      document.addEventListener('mousedown', calendarOutsideClickHandler)
    } else {
      document.removeEventListener('mousedown', calendarOutsideClickHandler)
    }

    return () => {
      document.removeEventListener('mousedown', calendarOutsideClickHandler)
    }
  }, [isCalendarOpen])

  const selectDateHandler = (date: Date) => {
    const formattedDate = format(date, 'dd.MM.yyyy', { locale: ru })

    setValue(name, formattedDate as PathValue<T, Path<T>>)
    setIsCalendarOpen(false)
  }

  return {
    calendarRef,
    isCalendarOpen,
    selectDateHandler,
    toggleCalendar,
  }
}
