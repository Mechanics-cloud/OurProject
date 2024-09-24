import { useForm } from 'react-hook-form'

import {
  GithubSvgrepoCom31,
  GoogleSvgrepoCom1,
} from '@/assets/icons/filledIcons'
import { TextField, Typography, typographyVariants } from '@/common/components'
import { Button } from '@/common/components/button'
import { Card } from '@/common/components/card'
import { Checkbox } from '@/common/components/checkbox'
import { cn } from '@/common/utils/cn'
import { SignUpFields, signUpSchema } from '@/pages/auth/sign-up/_singUpSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'

const SignUp = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<SignUpFields>({ resolver: zodResolver(signUpSchema) })

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <div className={'h-screen grid place-items-center'}>
      <Card className={'pt-6 pb-7'}>
        <Typography
          className={'text-center mb-3'}
          variant={'h1'}
        >
          Sign Up
        </Typography>
        <div className={'flex gap-14 mb-6 justify-center'}>
          <button
            title={'Sing Up with Google'}
            type={'button'}
          >
            <GoogleSvgrepoCom1
              height={36}
              width={36}
            />
          </button>
          <button
            title={'Sing Up with GitHub'}
            type={'button'}
          >
            <GithubSvgrepoCom31
              height={36}
              width={36}
            />
          </button>
        </div>

        <form onSubmit={onSubmit}>
          <TextField
            className={'mb-6'}
            error={errors.username?.message}
            label={'Username'}
            placeholder={'Enter your username'}
            {...register('username')}
          />
          <TextField
            className={'mb-6'}
            error={errors.email?.message}
            label={'Email'}
            placeholder={'Enter your email'}
            {...register('email')}
          />
          <TextField
            className={'mb-6'}
            error={errors.password?.message}
            label={'Password'}
            placeholder={'Enter a password'}
            type={'password'}
            {...register('password')}
          />
          <TextField
            className={'mb-6'}
            error={errors.passwordConfirmation?.message}
            label={'Password confirmation'}
            placeholder={'Confirm your password'}
            type={'password'}
            {...register('passwordConfirmation')}
          />
          <div
            className={cn(
              typographyVariants({ variant: 'small' }),
              `flex items-center gap-1 mb-3`
            )}
          >
            <Checkbox
              id={'agreement'}
              label={`I agree to the`}
            />
            <Typography
              href={''}
              variant={'smallLink'}
            >
              Terms of Service
            </Typography>
            and
            <Typography
              href={''}
              variant={'smallLink'}
            >
              Privacy Policy
            </Typography>
          </div>
          <Button
            className={'w-full mb-[18px]'}
            type={'submit'}
          >
            Sign Up
          </Button>
        </form>

        <div className={'flex flex-col gap-y-1.5 items-center'}>
          <span>Do you have an account?</span>
          <Link
            className={cn(
              typographyVariants({ variant: 'h3' }),
              'grow text-accent-500 w-full text-center'
            )}
            href={''}
          >
            Sign in
          </Link>
        </div>
      </Card>
    </div>
  )
}

export default SignUp
