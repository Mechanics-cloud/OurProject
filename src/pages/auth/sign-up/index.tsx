import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import {
  GithubSvgrepoCom31,
  GoogleSvgrepoCom1,
} from '@/assets/icons/filledIcons'
import { Typography, typographyVariants } from '@/common/components'
import { Button } from '@/common/components/button'
import { Card } from '@/common/components/card'
import { FormCheckbox } from '@/common/components/form/FormCheckbox'
import { FormTextField } from '@/common/components/form/FormTextField'
import { cn } from '@/common/utils/cn'
import { SignUpFields, signUpSchema } from '@/pages/auth/sign-up/_singUpSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'

const SignUp = () => {
  const {
    clearErrors,
    control,
    formState: { errors, isValid, touchedFields },
    handleSubmit,
    setError,
    watch,
  } = useForm<SignUpFields>({
    mode: 'onChange',
    resolver: zodResolver(signUpSchema),
  })

  const onSubmit = handleSubmit((data) => {
    alert(data)
  })

  const password = watch('password')
  const confirm = watch('confirm')

  useEffect(() => {
    if (touchedFields.confirm) {
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

        <form
          className={'min-w-80'}
          onSubmit={onSubmit}
        >
          <FormTextField
            className={'mb-6'}
            control={control}
            label={'Username'}
            name={'username'}
            placeholder={'Enter your username'}
          />
          <FormTextField
            className={'mb-6'}
            control={control}
            error={errors.email?.message}
            label={'Email'}
            name={'email'}
            placeholder={'Enter your email'}
          />
          <FormTextField
            className={'mb-6'}
            control={control}
            error={errors.password?.message}
            label={'Password'}
            name={'password'}
            placeholder={'Enter a password'}
            type={'password'}
          />
          <FormTextField
            className={'mb-6'}
            control={control}
            error={errors.confirm?.message}
            label={'Password confirmation'}
            name={'confirm'}
            placeholder={'Confirm your password'}
            type={'password'}
          />
          <div
            className={cn(
              typographyVariants({ variant: 'small' }),
              `flex items-center gap-1 mb-3`
            )}
          >
            <FormCheckbox
              control={control}
              id={'agreement'}
              label={`I agree to the`}
              name={'agreesToTOS'}
              typographyVariant={'small'}
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
            disabled={!isValid}
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
