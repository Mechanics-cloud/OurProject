import { useEffect, useRef, useState } from 'react'
import { FieldValues, Path, PathValue, UseFormSetValue } from 'react-hook-form'

import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

export const useCalendar = <T extends FieldValues>(
  setValue: UseFormSetValue<T>,
  name: Path<T>
) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false)
  const calendarRef = useRef<HTMLDivElement>(null)

  const toggleCalendar = () => {
    setIsCalendarOpen((prev) => !prev)
  }

  useEffect(() => {
    const onCalendarOutsideClick = (e: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(e.target as Node)
      ) {
        setIsCalendarOpen(false)
      }
    }

    if (isCalendarOpen) {
      document.addEventListener('mousedown', onCalendarOutsideClick)
    } else {
      document.removeEventListener('mousedown', onCalendarOutsideClick)
    }

    return () => {
      document.removeEventListener('mousedown', onCalendarOutsideClick)
    }
  }, [isCalendarOpen])

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
