import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { responseErrorHandler } from '@/common/utils'
import {
  UserInfo,
  generalInfoSchema,
  profileStore,
  useAvatarUpload,
} from '@/features/profile'
import { zodResolver } from '@hookform/resolvers/zod'
import { LocaleType } from '@locales/ru'

export const useFillGeneralInfo = (t: LocaleType) => {
  const {
    isPhotoChanged,
    onModalPhotoSave,
    photoObj,
    setIsPhotoChanged,
    setPhotoObj,
  } = useAvatarUpload()
  const userProfile = profileStore.userProfile

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
      dateOfBirth: userProfile?.dateOfBirth || '',
      firstName: userProfile?.firstName || '',
      lastName: userProfile?.lastName || '',
      userName: userProfile?.userName || '',
    },
    mode: 'onChange',
    resolver: zodResolver(generalInfoSchema),
  })

  const onSubmit = async (data: UserInfo) => {
    try {
      if (isDirty) {
        await profileStore.updateProfile(data)
      }
      reset(data)
      if (isPhotoChanged) {
        setIsPhotoChanged(false)
        await profileStore.uploadAvatar(photoObj)
      }

      if (!photoObj.photoUrl && !photoObj.photoFile && isPhotoChanged) {
        await profileStore.deleteAvatar()
      }
      toast.success(t.profileSettings.updateStatusMessages)
    } catch (error) {
      responseErrorHandler(error)
    }
  }

  return {
    control,
    isDirty,
    isPhotoChanged,
    isSubmitting,
    isValid,
    onModalPhotoSave,
    onSubmit: handleSubmit(onSubmit),
    photoObj,
    setIsPhotoChanged,
    setPhotoObj,
    setValue,
  }
}
