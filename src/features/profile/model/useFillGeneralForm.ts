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
  const [toggleOpen, setToggleOpen] = useState<boolean>(false)
  const calendarRef = useRef<HTMLDivElement>(null)
  const profile = AuthStore.profile
  const {
    control,
    formState: {},
    handleSubmit,
    register,
    setValue,
    watch,
  } = useForm<FormData>({
    defaultValues: {
      city: '',
      country: '',
      date: '',
      firstName: '',
      lastName: '',
      username: profile?.userName,
    },
    resolver: zodResolver(generalInfoSchema),
  })

  const country = watch('country')
  const city = watch('city')

  const onSubmit = (data: FormData) => {
    alert(data)
  }

  const calendarOpenHandler = () => {
    setToggleOpen(true)
  }

  const calendarOutsideClickHandler = (e: MouseEvent) => {
    if (
      calendarRef.current &&
      !calendarRef.current.contains(e.target as Node)
    ) {
      setToggleOpen(false)
    }
  }

  useEffect(() => {
    if (toggleOpen) {
      document.addEventListener('mousedown', calendarOutsideClickHandler)
    } else {
      document.removeEventListener('mousedown', calendarOutsideClickHandler)
    }

    return () => {
      document.removeEventListener('mousedown', calendarOutsideClickHandler)
    }
  }, [toggleOpen])

  const selectDateHandler = (date: Date) => {
    const formattedDate = format(date, 'dd.MM.yyyy', { locale: ru })

    setValue('date', formattedDate)
    setToggleOpen(false)
  }

  return {
    calendarOpenHandler,
    calendarRef,
    city,
    control,
    country,
    handleSubmit,
    onSubmit,
    register,
    selectDateHandler,
    setValue,
    toggleOpen,
  }
}
