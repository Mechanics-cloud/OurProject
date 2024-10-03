import { useForm } from 'react-hook-form'

import { Button, Card, Typography, useTranslation } from '@/common'
import { FormTextField } from '@/common/form'
import { Paths } from '@/common/paths'
import { zodResolver } from '@hookform/resolvers/zod'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'
import Router from 'next/router'

import authStore from '../model/authStore'
import { signInSchema } from '../model/singInSchemma'
import { ExternalServicesRegistration } from './ExternalServicesRegistration'

export type LoginForm = {
  email: string
  password: string
}

const SignIn = observer(() => {
  const { t } = useTranslation()

  const {
    control,
    formState: { isValid },
    handleSubmit,
    setError,
    setFocus,
  } = useForm<LoginForm>({
    defaultValues: { email: '', password: '' },
    mode: 'onTouched',
    resolver: zodResolver(signInSchema),
  })

  const onSubmit = async (data: LoginForm) => {
    try {
      await authStore.login(data)
      Router.push(Paths.home)
    } catch (error: any) {
      setError('email', {
        message: t.signInForm.errorResponse,
        type: 'manual',
      }),
        setFocus('email')
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
          <FormTextField
            control={control}
            disabled={authStore.isLoading}
            label={t.signInForm.labelEmail}
            name={'email'}
            placeholder={'Epam@epam.com'}
            type={'email'}
          />
          <FormTextField
            control={control}
            disabled={authStore.isLoading}
            label={t.signInForm.labelPassword}
            name={'password'}
            placeholder={'**********'}
            type={'password'}
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
          <Link href={Paths.signUp}>{t.signInForm.signUpTitle}</Link>
        </Button>
      </Card>
    </div>
  )
})

export default SignIn
