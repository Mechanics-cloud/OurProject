import { useRef } from 'react'
import { ReCAPTCHA } from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { Environments, ErrorResponse, Nullable } from '@/common'
import {
  ForgotPasswordFields,
  authApi,
  forgotPasswordSchema,
} from '@/features/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import * as axios from 'axios'

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
      if (axios.isAxiosError(error) && error.response?.data?.messages) {
        const errorData = error.response?.data as ErrorResponse

        errorData.messages.forEach(({ field, message }) => {
          toast.error(message)
          setError(field as keyof ForgotPasswordFields, { message })
        })
      } else {
        toast.error((error as Error).message ?? 'Something went wrong')
      }
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
