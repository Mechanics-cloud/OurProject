import { useRef, useState } from 'react'
import { ReCAPTCHA } from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'

import { Environments, Nullable, PublicPaths, useModal } from '@/common'
import { responseErrorHandler } from '@/common/utils/responseErrorHandler'
import {
  ForgotPasswordFields,
  authApi,
  forgotPasswordSchema,
} from '@/features/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { LocaleType } from '@locales/ru'
import { useRouter } from 'next/router'

export const useForgotPassword = (t: LocaleType) => {
  const router = useRouter()
  const recaptchaRef = useRef<Nullable<ReCAPTCHA>>(null)

  const [email, setEmail] = useState('')

  const { isModalOpen, onModalClose, openModal } = useModal()
  const {
    control,
    formState: { errors, isSubmitting, isValid },
    getValues,
    handleSubmit,
    setError,
    setValue,
  } = useForm<ForgotPasswordFields>({
    defaultValues: {
      email: '',
      recaptcha: '',
    },
    mode: 'onChange',
    resolver: zodResolver(forgotPasswordSchema(t)),
  })

  const onChangeRecaptcha = (token: Nullable<string>) =>
    setValue('recaptcha', token ?? '', { shouldValidate: true })

  const onResetRecaptcha = () => {
    onChangeRecaptcha(null)
    recaptchaRef?.current?.reset()
  }

  const onExpireRecaptcha = async () => {
    await router.push(PublicPaths.expiredSession)
  }

  const onSubmit = handleSubmit(async (data) => {
    if (!data.recaptcha) {
      responseErrorHandler(new Error(t.validation.recaptchaRequired))

      return
    }
    try {
      await authApi.recoverPassword({
        baseUrl: Environments.BASE_URL ?? '',
        email: data.email,
        recaptcha: data.recaptcha,
      })
      setEmail(data.email)
      openModal()
    } catch (error: unknown) {
      responseErrorHandler(error, setError)
    } finally {
      onResetRecaptcha()
    }
  })

  return {
    control,
    email,
    errors,
    getValues,
    isModalOpen,
    isSubmitting,
    isValid,
    onChangeRecaptcha,
    onExpireRecaptcha,
    onModalClose,
    onSubmit,
    recaptchaRef,
  }
}
