import { useForm } from 'react-hook-form'

import { responseErrorHandler } from '@/common/utils/responseErrorHandler'
import AuthStore from '@/features/auth/model/authStore'
import { UserInfo } from '@/features/profile/settings/generalInfo'
import { generalInfoSchema } from '@/features/profile/settings/generalInfo/model/generalInfoSchema'
import ProfileStore from '@/features/profile/settings/generalInfo/model/profileStore'
import { useAvatarUpload } from '@/features/profile/settings/generalInfo/model/useAvatarUpload'
import { zodResolver } from '@hookform/resolvers/zod'

export const useFillGeneralInfo = () => {
  const { onModalPhotoSave, photoChanged, photoObj, setPhotoChanged } =
    useAvatarUpload()
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
      reset({
        ...data,
      })
      if (photoChanged) {
        await ProfileStore.uploadAvatar(photoObj)
        setPhotoChanged(false)
      }
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
    setValue,
  }
}
