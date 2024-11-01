import { useForm } from 'react-hook-form'

import { Paths, useTranslation } from '@/common'
import { generalStore } from '@/core/store'
import { authStore } from '@/features/auth'
import {
  SignInFields,
  signInSchema,
} from '@/features/auth/model/signIn/singInSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import Router from 'next/router'

export const useSignIn = () => {
  const { t } = useTranslation()
  const {
    control,
    formState: { isValid },
    handleSubmit,
    setError,
    setFocus,
  } = useForm<SignInFields>({
    defaultValues: { email: '', password: '' },
    mode: 'onTouched',
    resolver: zodResolver(signInSchema),
  })
  const isLoadingStore = generalStore

  const onSubmit = async (data: SignInFields) => {
    isLoadingStore.turnOnLoading()
    data.email = data.email.toLowerCase()
    try {
      await authStore.login(data)
      await Router.push(Paths.home)
    } catch (error: unknown) {
      setError('email', {
        message: t.signInForm.errorResponse,
        type: 'manual',
      })
      setFocus('email')
    } finally {
      isLoadingStore.turnOffLoading()
    }
  }

  return {
    control,
    handleSubmit,
    isLoading: isLoadingStore.isLoading,
    isValid,
    onSubmit,
    t,
  }
}
