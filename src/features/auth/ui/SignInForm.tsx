import { useForm } from 'react-hook-form'

import { Button, Card, TextField, Typography, useTranslation } from '@/common'
import { zodResolver } from '@hookform/resolvers/zod'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'
import Router from 'next/router'

import authStore from '../model/authStore'
import { signInSchema } from '../model/singInSchemma'
import { ExternalServicesRegistration } from './ExternalServicesRegistration'

export type LoginFormType = {
  email: string
  password: string
}

const SignIn = observer(() => {
  const { t } = useTranslation()

  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
    setError,
  } = useForm<LoginFormType>({
    mode: 'onTouched',
    resolver: zodResolver(signInSchema),
  })

  const onSubmit = async (data: LoginFormType) => {
    try {
      await authStore.login(data)
      Router.push('/')
    } catch (error: any) {
      setError('email', {
        message: 'The email or password are incorrect. Try again please',
        type: 'manual',
      })
    }
  }

  return (
    <div className={'flex items-center justify-center w-full h-full'}>
      <Card className={'flex flex-col items-center w-[378px]'}>
        <Typography variant={'h1'}>{t.signInForm.title}</Typography>{' '}
        <ExternalServicesRegistration />
        <form
          className={'flex flex-col  w-full h-full'}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            disabled={authStore.isLoading}
            error={errors.email?.message}
            label={t.signInForm.labelEmail}
            placeholder={'Epam@epam.com'}
            type={'email'}
            {...register('email')}
          />

          <TextField
            disabled={authStore.isLoading}
            error={errors.password?.message}
            label={t.signInForm.labelPassword}
            placeholder={'**********'}
            type={'password'}
            {...register('password')}
          />
          <Link
            className={'self-end mt-3 mb-6 text-light-900'}
            href={'/*'}
          >
            {t.signInForm.passwordRecovery}
          </Link>

          <Button
            disabled={!isValid || authStore.isLoading}
            type={'submit'}
          >
            {t.signInForm.title}
          </Button>
        </form>
        <Typography
          className={'mt-4'}
          variant={'reg16'}
        >
          {t.signInForm.text}
        </Typography>
        <Button
          asChild
          variant={'text'}
        >
          <Link href={'/auth/sign-up'}>{t.signInForm.signUpTitle}</Link>
        </Button>
      </Card>
    </div>
  )
})

export default SignIn
