import { useForm } from 'react-hook-form'

import {
  GithubSvgrepoCom31,
  GoogleSvgrepoCom1,
} from '@/assets/icons/filledIcons'
import { TextField, Typography } from '@/common/components'
import { Button } from '@/common/components/button'
import { Card } from '@/common/components/card'
import authStore from '@/features/auth/model/authStore'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'
import Router from 'next/router'

export type LoginFormType = {
  email: string
  password: string
}

const SignIn = observer(() => {
  const {
    clearErrors,
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm<LoginFormType>({ mode: 'onBlur', reValidateMode: 'onBlur' })

  const onSubmit = async (data: LoginFormType) => {
    try {
      await authStore.login(data)
      Router.push('/')
    } catch (error: any) {
      setError('email', {
        message: error.response.data.messages,
        type: 'manual',
      })
    }
  }

  return (
    <div className={'flex items-center justify-center w-full h-full'}>
      <Card className={'flex flex-col items-center w-[378px]'}>
        <Typography variant={'h1'}>Sign In</Typography>
        <div className={'flex gap-[60px] [&_svg]:w-9 [&_svg]:h-9 mt-3 mb-6'}>
          <button
            onClick={() => {}}
            type={'button'}
          >
            <GoogleSvgrepoCom1 />
          </button>
          <button
            onClick={() => {}}
            type={'button'}
          >
            <GithubSvgrepoCom31 />
          </button>
        </div>
        <form
          className={'flex flex-col  w-full h-full'}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={'h-[90px]'}>
            <TextField
              disabled={authStore.isLoading}
              error={errors.email?.message}
              label={'Email'}
              type={'email'}
              {...register('email', {
                onChange: () => {
                  clearErrors('email')
                },
                pattern: {
                  message: 'Address entered incorrectly',
                  value: /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]/,
                },
                required: 'This field is required',
              })}
            />
          </div>
          <div className={'h-[90px]'}>
            <TextField
              disabled={authStore.isLoading}
              error={errors.password?.message}
              label={'Password'}
              type={'password'}
              {...register('password', {
                minLength: { message: 'Minimum 5 characters', value: 5 },
                onChange: () => {
                  clearErrors('password')
                },
                required: 'This field is required',
              })}
            />
          </div>
          <Link
            className={'self-end mt-3 mb-6'}
            href={'/*'}
          >
            Forgot Password
          </Link>

          <Button
            disabled={authStore.isLoading}
            type={'submit'}
          >
            Sign In
          </Button>
        </form>
        <Typography
          className={'mt-4'}
          variant={'reg16'}
        >
          Don’t have an account?
        </Typography>
        <Button
          asChild
          variant={'text'}
        >
          <Link href={'/auth/sign-in'}>Sign Up</Link>
        </Button>
      </Card>
    </div>
  )
})

export default SignIn
