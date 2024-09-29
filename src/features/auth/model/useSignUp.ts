import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { signUpApi } from '@/features/auth/api/signUpAPI'
import { SignUpFields, signUpSchema } from '@/features/auth/model/singUpSchema'
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
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const onSubmit = handleSubmit(async (data) => {
    const { confirm, ...restData } = data
    const baseUrl = process.env.NEXT_PUBLIC_INCTAGRAM_BASE_URL as string

    setIsLoading(true)
    try {
      const res = await signUpApi.signUp({ ...restData, baseUrl })

      if (!res.data) {
        setIsOpen(true)
      }
    } catch (e: any) {
      toast.error(e.message ?? 'Something went wrong')
    }
    setIsLoading(false)
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
    isLoading,
    isOpen,
    isValid,
    onModalClose,
    onSubmit,
    userEmail,
  }
}
