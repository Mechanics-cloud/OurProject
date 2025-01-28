import { useForm } from 'react-hook-form'

import { generalStore } from '@/core/store'
import { authStore } from '@/features/auth'
import {
  SignInFields,
  signInSchema,
} from '@/features/auth/model/signIn/singInSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { LocaleType } from '@locales/ru'

export const useSignIn = (t: LocaleType) => {
  const {
    control,
    formState: { isValid },
    handleSubmit,
    setError,
    setFocus,
  } = useForm<SignInFields>({
    defaultValues: { email: '', password: '' },
    mode: 'onTouched',
    resolver: zodResolver(signInSchema(t)),
  })
  const isLoadingStore = generalStore

  const onSubmit = handleSubmit(async (data: SignInFields) => {
    isLoadingStore.turnOnLoading()
    data.email = data.email.toLowerCase()
    try {
      await authStore.login(data)
    } catch (error: unknown) {
      setError('email', {
        message: t.signIn.errorResponse,
        type: 'manual',
      })
      setFocus('email')
    } finally {
      isLoadingStore.turnOffLoading()
    }
  })

  return {
    control,
    isLoading: isLoadingStore.isLoading,
    isValid,
    onSubmit,
    t,
  }
}
