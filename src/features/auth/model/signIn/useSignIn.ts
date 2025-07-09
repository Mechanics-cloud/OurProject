import { useForm } from 'react-hook-form'

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
    formState: { isSubmitting, isValid },
    handleSubmit,
    setError,
    setFocus,
  } = useForm<SignInFields>({
    defaultValues: { email: '', password: '' },
    mode: 'all',
    resolver: zodResolver(signInSchema(t)),
  })

  const onSubmit = handleSubmit(async (data: SignInFields) => {
    data.email = data.email.toLowerCase()
    try {
      await authStore.login(data)
    } catch (error: unknown) {
      setError('email', { message: t.signIn.errorResponse })
      setError('password', { message: t.signIn.errorResponse })
      setFocus('email')
    }
  })

  return {
    control,
    isSubmitting,
    isValid,
    onSubmit,
    t,
  }
}
