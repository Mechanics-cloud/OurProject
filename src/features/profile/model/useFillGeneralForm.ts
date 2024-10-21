import { useEffect, useRef, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'

import { responseErrorHandler } from '@/common/utils/responseErrorHandler'
import AuthStore from '@/features/auth/model/authStore'
import { generalInfoSchema } from '@/features/profile/model/generalInfoSchema'
import ProfileStore from '@/features/profile/model/profileStore'
import { useFetchLocations } from '@/features/profile/model/useFetchLocations'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

export type FormData = {
  aboutMe?: string
  city?: string
  country?: string
  dateOfBirth?: string
  firstName: string
  lastName: string
  userName: string
}

export type UpdatedProfile = { region: string } & Required<FormData>

export const useFillGeneralForm = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false)
  const [cities, setCities] = useState<string[] | undefined>([])
  const calendarRef = useRef<HTMLDivElement>(null)
  const profile = AuthStore.profile
  const {
    control,
    formState: { isSubmitting, isValid },
    handleSubmit,
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      aboutMe: '',
      city: '',
      country: '',
      dateOfBirth: '',
      firstName: '',
      lastName: '',
      userName: profile?.userName || '',
    },
    mode: 'onChange',
    resolver: zodResolver(generalInfoSchema),
  })

  const onSubmit = async (data: FormData) => {
    try {
      await ProfileStore.updateProfile(data)
    } catch (error) {
      responseErrorHandler(error)
    }
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

    setValue('dateOfBirth', formattedDate)
    setIsCalendarOpen(false)
  }

  const { countriesData } = useFetchLocations()

  const countryValue = useWatch({
    control,
    name: 'country',
  })

  useEffect(() => {
    if (countryValue) {
      const filteredCountryData = countriesData?.filter(
        (country) => country.country === countryValue
      )

      if (filteredCountryData) {
        setCities(filteredCountryData[0].cities)
      }
    }
  }, [countriesData, countryValue])

  return {
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
    setValue,
    toggleCalendar,
  }
}
