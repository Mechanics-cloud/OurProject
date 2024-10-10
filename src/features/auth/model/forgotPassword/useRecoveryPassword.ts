import { useForm } from 'react-hook-form'

import { Paths } from '@/common'
import { responseErrorHandler } from '@/common/utils/responseErrorHandler'
import { authApi } from '@/features/auth'
import {
  RecoveryPasswordFields,
  recoveryPasswordSchema,
} from '@/features/auth/model/forgotPassword/recoveryPasswordSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'

export const useRecoveryPassword = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const {
    control,
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
  } = useForm<RecoveryPasswordFields>({
    defaultValues: {
      confirm: '',
      password: '',
    },
    mode: 'onChange',
    resolver: zodResolver(recoveryPasswordSchema),
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      await authApi.newPassword({
        newPassword: data.password,
        recoveryCode: searchParams?.get('code') ?? '',
      })
      await router.push(Paths.signIn)
    } catch (error: unknown) {
      responseErrorHandler(error)
    }
  })

  return {
    control,
    errors,
    handleSubmit,
    isSubmitting,
    isValid,
    onSubmit,
  }
}
