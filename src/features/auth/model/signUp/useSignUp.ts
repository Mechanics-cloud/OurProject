import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { useModal } from '@/common'
import { Environments } from '@/common/enviroments'
import { responseErrorHandler } from '@/common/utils/responseErrorHandler'
import { generalStore } from '@/core/store'
import { SignUpFields, authApi, signUpSchema } from '@/features/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { LocaleType } from '@locales/ru'

export const useSignUp = (t: LocaleType) => {
  const {
    clearErrors,
    control,
    formState: { errors, isValid, touchedFields },
    handleSubmit,
    reset,
    resetField,
    setError,
    watch,
  } = useForm<SignUpFields>({
    defaultValues: {
      agreesToTOS: false,
      confirm: '',
      email: '',
      password: '',
      userName: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(signUpSchema(t)),
  })
  const isLoadingStore = generalStore
  const { isModalOpen, onModalClose, openModal } = useModal(() => {
    reset()
  })

  const onSubmit = handleSubmit(async (data) => {
    const { confirm, ...restData } = data
    const baseUrl = Environments.BASE_URL as string

    isLoadingStore.turnOnLoading()
    try {
      const res = await authApi.signUp({ ...restData, baseUrl })

      if (!res.data) {
        openModal()
      }
    } catch (error: unknown) {
      responseErrorHandler(error, setError)
      resetField('confirm')
      setError('confirm', {
        message: t.signUp.labels.confirm,
        type: 'manual',
      })
    }
    isLoadingStore.turnOffLoading()
  })

  const password = watch('password')
  const confirm = watch('confirm')
  const userEmail = watch('email')

  useEffect(() => {
    if (touchedFields.confirm && password && confirm) {
      const isSame = password === confirm

      if (!isSame) {
        setError('confirm', {
          message: 'Passwords must match',
          type: 'manual',
        })
      } else {
        clearErrors('confirm')
      }
    }
  }, [touchedFields.confirm, confirm, password, clearErrors, setError])

  return {
    control,
    errors,
    isLoading: isLoadingStore.isLoading,
    isModalOpen,
    isValid,
    onModalClose,
    onSubmit,
    userEmail,
  }
}
