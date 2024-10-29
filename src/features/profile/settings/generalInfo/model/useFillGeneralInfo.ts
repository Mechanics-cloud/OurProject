import { useForm } from 'react-hook-form'

import { responseErrorHandler } from '@/common/utils/responseErrorHandler'
import AuthStore from '@/features/auth/model/authStore'
import { UserInfo, useCalendar } from '@/features/profile/settings/generalInfo'
import { generalInfoSchema } from '@/features/profile/settings/generalInfo/model/generalInfoSchema'
import ProfileStore from '@/features/profile/settings/generalInfo/model/profileStore'
import { useAvatarUpload } from '@/features/profile/settings/generalInfo/model/useAvatarUpload'
import { useFetchLocations } from '@/features/profile/settings/generalInfo/model/useFetchLocations'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

export const useFillGeneralInfo = () => {
  const { onModalPhotoSave, photoChanged, photoObj, setPhotoChanged } =
    useAvatarUpload()
  const profile = AuthStore.profile
  const userProfile = ProfileStore.userProfile

  const formattedDate =
    userProfile?.dateOfBirth &&
    format(userProfile?.dateOfBirth, 'dd.MM.yyyy', { locale: ru })

  const {
    control,
    formState: { isDirty, isSubmitting, isValid },
    handleSubmit,
    reset,
    setValue,
  } = useForm<UserInfo>({
    defaultValues: {
      aboutMe: userProfile?.aboutMe || '',
      city: userProfile?.city || '',
      country: userProfile?.country || '',
      dateOfBirth: formattedDate || '',
      firstName: userProfile?.firstName || '',
      lastName: userProfile?.lastName || '',
      userName: userProfile?.userName || profile?.userName,
    },
    mode: 'onChange',
    resolver: zodResolver(generalInfoSchema),
  })

  const { calendarRef, isCalendarOpen, onSelectDate, toggleCalendar } =
    useCalendar(setValue, 'dateOfBirth')
  const { cities, countriesData, countryValue } = useFetchLocations(control)

  const onSubmit = async (data: UserInfo) => {
    try {
      if (isDirty) {
        await ProfileStore.updateProfile(data)
        reset()
      }
      if (photoChanged) {
        await ProfileStore.uploadAvatar(photoObj)
        setPhotoChanged(false)
      }
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
    isDirty,
    isSubmitting,
    isValid,
    onModalPhotoSave,
    onSelectDate,
    onSubmit: handleSubmit(onSubmit),
    photoChanged,
    photoObj,
    toggleCalendar,
  }
}
