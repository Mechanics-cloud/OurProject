import { useForm } from 'react-hook-form'

import { responseErrorHandler } from '@/common/utils/responseErrorHandler'
import AuthStore from '@/features/auth/model/authStore'
import { generalInfoSchema } from '@/features/profile/model/generalInfoSchema'
import ProfileStore from '@/features/profile/model/profileStore'
import { useFetchLocations } from '@/features/profile/model/useFetchLocations'
import { useHandleCalendar } from '@/features/profile/model/useHandleCalendar'
import { zodResolver } from '@hookform/resolvers/zod'

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
  const profile = AuthStore.profile
  const updatedProfile = ProfileStore.updatedProfile

  const {
    control,
    formState: { isSubmitting, isValid },
    handleSubmit,
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      aboutMe: updatedProfile?.aboutMe || '',
      city: updatedProfile?.city || '',
      country: updatedProfile?.country || '',
      dateOfBirth: updatedProfile?.dateOfBirth || '',
      firstName: updatedProfile?.firstName || '',
      lastName: updatedProfile?.lastName || '',
      userName: updatedProfile?.userName || profile?.userName,
    },
    mode: 'onChange',
    resolver: zodResolver(generalInfoSchema),
  })

  const { calendarRef, isCalendarOpen, selectDateHandler, toggleCalendar } =
    useHandleCalendar(setValue, 'dateOfBirth')
  const { cities, countriesData, countryValue } = useFetchLocations(control)

  const onSubmit = async (data: FormData) => {
    try {
      await ProfileStore.updateProfile(data)
    } catch (error) {
      responseErrorHandler(error)
    }
  }

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
    toggleCalendar,
  }
}
