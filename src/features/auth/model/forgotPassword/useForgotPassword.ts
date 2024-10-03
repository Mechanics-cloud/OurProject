import { useRef } from 'react'
import { ReCAPTCHA } from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { Environments, Nullable } from '@/common'
import { responseErrorHandler } from '@/common/utils/responseErrorHandler'
import {
  ForgotPasswordFields,
  authApi,
  forgotPasswordSchema,
} from '@/features/auth'
import { zodResolver } from '@hookform/resolvers/zod'

export const useForgotPassword = () => {
  const recaptchaRef = useRef<Nullable<ReCAPTCHA>>(null)
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    setError,
    setValue,
  } = useForm<ForgotPasswordFields>({
    defaultValues: {
      email: '',
      recaptcha: '',
    },
    mode: 'onChange',
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onChangeRecaptcha = (token: Nullable<string>) =>
    token && setValue('recaptcha', token, { shouldValidate: true })

  const onResetRecaptcha = () => {
    setValue('recaptcha', '')
    recaptchaRef?.current?.reset()
  }

  const onSubmit = handleSubmit(async (data) => {
    if (!data.recaptcha) {
      return toast.error('Recaptcha is required')
    }

    try {
      await authApi.recoverPassword({
        baseUrl: Environments.BASE_URL ?? '',
        email: data.email,
        recaptcha: data.recaptcha,
      })
      toast.success('Success! Check your email')
    } catch (error: unknown) {
      onResetRecaptcha()
      responseErrorHandler(error, setError)
    }
  })

  return {
    control,
    errors,
    isValid,
    onChangeRecaptcha,
    onResetRecaptcha,
    onSubmit,
    recaptchaRef,
  }
}
