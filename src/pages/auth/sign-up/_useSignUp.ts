import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { SignUpFields, signUpSchema } from '@/pages/auth/sign-up/_singUpSchema'
import { zodResolver } from '@hookform/resolvers/zod'

export const useSignUp = () => {
  const {
    clearErrors,
    control,
    formState: { errors, isValid, touchedFields },
    handleSubmit,
    setError,
    watch,
  } = useForm<SignUpFields>({
    defaultValues: {
      confirm: '',
      email: '',
      password: '',
      username: '',
    },
    mode: 'onChange',
    resolver: zodResolver(signUpSchema),
  })

  const onSubmit = handleSubmit((data) => {
    alert(data)
  })

  const password = watch('password')
  const confirm = watch('confirm')

  useEffect(() => {
    if (touchedFields.confirm && password && confirm) {
      const isValid = signUpSchema.safeParse({ confirm, password }).success

      if (!isValid) {
        setError('confirm', {
          message: "Passwords don't match",
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
    isValid,
    onSubmit,
  }
}
