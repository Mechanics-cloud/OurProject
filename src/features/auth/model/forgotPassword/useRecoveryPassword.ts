import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { Paths, useTranslation } from '@/common'
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
  const { t } = useTranslation(() => trigger())
  const router = useRouter()
  const searchParams = useSearchParams()

  const {
    control,
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    trigger,
  } = useForm<RecoveryPasswordFields>({
    defaultValues: {
      confirm: '',
      password: '',
    },
    mode: 'onChange',
    resolver: zodResolver(recoveryPasswordSchema(t)),
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      await authApi.newPassword({
        newPassword: data.password,
        recoveryCode: searchParams?.get('code') ?? '',
      })
      toast.success(t.recoveryPassword.passwordChanged)
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
