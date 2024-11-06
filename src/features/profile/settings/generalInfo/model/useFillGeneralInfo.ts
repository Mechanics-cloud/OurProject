import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { responseErrorHandler } from '@/common/utils'
import { generalStore } from '@/core/store'
import {
  UserInfo,
  generalInfoSchema,
  profileStore,
  useAvatarUpload,
} from '@/features/profile'
import { zodResolver } from '@hookform/resolvers/zod'

export const useFillGeneralInfo = () => {
  const {
    onModalPhotoSave,
    photoChanged,
    photoObj,
    setPhotoChanged,
    setPhotoObj,
  } = useAvatarUpload()
  const profile = generalStore.user
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
      userName: userProfile?.userName || profile?.userName,
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
      if (photoChanged) {
        setPhotoChanged(false)
        await profileStore.uploadAvatar(photoObj)
      }
      if (!photoObj.photo && !photoObj.photoForServer && photoChanged) {
        await profileStore.deleteAvatar()
      }
      toast.success('Your settings are saved!')
    } catch (error) {
      responseErrorHandler(error)
    }
  }

  return {
    control,
    handleSubmit,
    isDirty,
    isSubmitting,
    isValid,
    onModalPhotoSave,
    onSubmit: handleSubmit(onSubmit),
    photoChanged,
    photoObj,
    setPhotoChanged,
    setPhotoObj,
    setValue,
  }
}
