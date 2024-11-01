import { useRef, useState } from 'react'
import { ReCAPTCHA } from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import {
  Environments,
  Nullable,
  Paths,
  useModal,
  useTranslation,
} from '@/common'
import { responseErrorHandler } from '@/common/utils/responseErrorHandler'
import {
  ForgotPasswordFields,
  authApi,
  forgotPasswordSchema,
} from '@/features/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'

export const useForgotPassword = () => {
  const { t } = useTranslation(() => trigger())
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
    trigger,
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
    await router.push(Paths.expiredSession)
  }

  const onSubmit = handleSubmit(async (data) => {
    if (!data.recaptcha) {
      return toast.error(t.validation.recaptchaRequired)
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
