import { useForm } from 'react-hook-form'

import { responseErrorHandler } from '@/common/utils/responseErrorHandler'
import AuthStore from '@/features/auth/model/authStore'
import { PhotoResult } from '@/features/profile/settings/avatarDialog/model'
import { generalInfoSchema } from '@/features/profile/settings/generalInfo/model/generalInfoSchema'
import ProfileStore from '@/features/profile/settings/generalInfo/model/profileStore'
import { useFetchLocations } from '@/features/profile/settings/generalInfo/model/useFetchLocations'
import { useHandleCalendar } from '@/features/profile/settings/generalInfo/model/useHandleCalendar'
import { zodResolver } from '@hookform/resolvers/zod'

export type FormData = {
  aboutMe?: string
  city?: string
  country?: string
  dateOfBirth?: string
  firstName: string
  lastName: string
  photoData?: PhotoResult | undefined
  userName: string
}

export const useFillGeneralForm = () => {
  const profile = AuthStore.profile
  const userProfile = ProfileStore.userProfile
  const avatar = userProfile?.avatars[0].url

  const {
    control,
    formState: { isSubmitting, isValid },
    handleSubmit,
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      aboutMe: userProfile?.aboutMe || '',
      city: userProfile?.city || '',
      country: userProfile?.country || '',
      dateOfBirth: userProfile?.dateOfBirth || '',
      firstName: userProfile?.firstName || '',
      lastName: userProfile?.lastName || '',
      // photoData: {
      //   photo: null,
      //   photoForServer: null,
      // },
      photoData: avatar
        ? { photo: avatar, photoForServer: null }
        : { photo: null, photoForServer: null },

      userName: userProfile?.userName || profile?.userName,
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
