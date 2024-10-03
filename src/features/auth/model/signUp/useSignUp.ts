import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { generalStore } from '@/app/store'
import { Environments } from '@/common/enviroments'
import { responseErrorHandler } from '@/common/utils/responseErrorHandler'
import { SignUpFields, authApi, signUpSchema } from '@/features/auth'
import { zodResolver } from '@hookform/resolvers/zod'

export const useSignUp = () => {
  const {
    clearErrors,
    control,
    formState: { errors, isValid, touchedFields },
    handleSubmit,
    reset,
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
    mode: 'onChange',
    resolver: zodResolver(signUpSchema),
  })
  const [isOpen, setIsOpen] = useState(false)
  const isLoadingStore = generalStore

  const onSubmit = handleSubmit(async (data) => {
    const { confirm, ...restData } = data
    const baseUrl = Environments.BASE_URL as string

    isLoadingStore.turnOnLoading()
    try {
      const res = await authApi.signUp({ ...restData, baseUrl })

      if (!res.data) {
        setIsOpen(true)
      }
    } catch (error: unknown) {
      responseErrorHandler(error, setError)
    }
    isLoadingStore.turnOffLoading()
  })

  const onModalClose = () => {
    setIsOpen(false)
    reset()
  }

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
    isOpen,
    isValid,
    onModalClose,
    onSubmit,
    userEmail,
  }
}
