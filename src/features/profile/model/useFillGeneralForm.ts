import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import AuthStore from '@/features/auth/model/authStore'
import { generalInfoSchema } from '@/features/profile/model/generalInfoSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

type FormData = {
  aboutMe?: string
  city?: string
  country?: string
  date?: string
  firstName: string
  lastName: string
  username: string
}

export const useFillGeneralForm = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false)
  const calendarRef = useRef<HTMLDivElement>(null)
  const profile = AuthStore.profile
  const {
    control,
    formState: { isSubmitting, isValid },
    handleSubmit,
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      city: '',
      country: '',
      date: '',
      firstName: '',
      lastName: '',
      username: profile?.userName,
    },
    mode: 'onChange',
    resolver: zodResolver(generalInfoSchema),
  })

  const onSubmit = (data: FormData) => {
    alert(data)
  }

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

    setValue('date', formattedDate)
    setIsCalendarOpen(false)
  }

  return {
    calendarRef,
    control,
    handleSubmit,
    isCalendarOpen,
    isSubmitting,
    isValid,
    onSubmit,
    selectDateHandler,
    setValue,
    toggleCalendar,
  }
}
