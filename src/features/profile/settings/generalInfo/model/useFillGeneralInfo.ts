import { useForm } from 'react-hook-form'

import { responseErrorHandler } from '@/common/utils'
import { AuthStore } from '@/features/auth'
import {
  ProfileStore,
  UserInfo,
  generalInfoSchema,
  useAvatarUpload,
} from '@/features/profile'
import { zodResolver } from '@hookform/resolvers/zod'

export const useFillGeneralInfo = () => {
  const { dirty, onModalPhotoSave, photoObj, setDirty } = useAvatarUpload()
  const profile = AuthStore.profile
  const userProfile = ProfileStore.userProfile

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
        await ProfileStore.updateProfile(data)
      }
      reset(data)
      if (dirty) {
        setDirty(false)
        await ProfileStore.uploadAvatar(photoObj)
      }
    } catch (error) {
      responseErrorHandler(error)
    }
  }

  return {
    control,
    dirty,
    handleSubmit,
    isDirty,
    isSubmitting,
    isValid,
    onModalPhotoSave,
    onSubmit: handleSubmit(onSubmit),
    photoObj,
    setValue,
  }
}
