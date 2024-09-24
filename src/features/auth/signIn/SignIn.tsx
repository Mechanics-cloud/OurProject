import { useForm } from 'react-hook-form'

import {
  GithubSvgrepoCom31,
  GoogleSvgrepoCom1,
} from '@/assets/icons/filledIcons'
import { TextField, Typography } from '@/common/components'
import { Button } from '@/common/components/button'
import { Card } from '@/common/components/card'
import Link from 'next/link'

type LoginFormType = {
  email: string
  password: string
}

export const SignIn = () => {
  const {
    clearErrors,
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm<LoginFormType>({ mode: 'onBlur', reValidateMode: 'onChange' })

  const onSubmit = (data: LoginFormType) => {
    alert(JSON.stringify(data))
  }

  return (
    <>
      <Card className={'flex flex-col items-center'}>
        <Typography variant={'h1'}>Sign In</Typography>
        <div className={'flex gap-[60px] [&_svg]:w-9 [&_svg]:h-9 mt-3 mb-6'}>
          <button type={'button'}>
            <GoogleSvgrepoCom1 />
          </button>
          <button type={'button'}>
            <GithubSvgrepoCom31 />
          </button>
        </div>
        <form
          className={'flex flex-col gap-6 w-full h-full'}
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
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
          <TextField
            error={errors.password?.message}
            label={'Password'}
            type={'password'}
            {...register('password', {
              minLength: { message: 'Minimum 2 characters', value: 2 },
              onChange: () => {
                clearErrors('password')
              },
              required: 'This field is required',
            })}
          />

          <Link
            className={'self-end mt-3'}
            href={'/*'}
          >
            Forgot Password
          </Link>

          <Button>Sign In</Button>
        </form>
        <Typography
          className={'mt-4'}
          variant={'reg16'}
        >
          Don’t have an account?
        </Typography>
        <Button variant={'text'}>Sign Up</Button>
      </Card>
    </>
  )
}
