import {
  GithubSvgrepoCom31,
  GoogleSvgrepoCom1,
} from '@/assets/icons/filledIcons'
import {
  Button,
  Card,
  FormCheckbox,
  FormTextField,
  Typography,
  typographyVariants,
} from '@/common'
import { cn } from '@/common/utils/cn'
import { useSignUp } from '@/pages/auth/sign-up/_useSignUp'
import Link from 'next/link'

import { useTranslation } from '../../../../hooks/useTranslation'

const SignUp = () => {
  const { control, errors, isValid, onSubmit } = useSignUp()
  const { t } = useTranslation()

  return (
    <div className={'h-screen grid place-items-center'}>
      <Card className={'pt-6 pb-7'}>
        <Typography
          className={'text-center mb-3'}
          variant={'h1'}
        >
          {t.signUpForm.title}
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
            control={control}
            label={t.signUpForm.labels.userName}
            name={'username'}
            placeholder={t.signUpForm.placeholders.userName}
          />
          <FormTextField
            control={control}
            error={errors.email?.message}
            label={'Email'}
            name={t.signUpForm.labels.email}
            placeholder={''}
          />
          <FormTextField
            control={control}
            error={errors.password?.message}
            label={'Password'}
            name={'password'}
            placeholder={'Enter a password'}
            type={'password'}
          />
          <FormTextField
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
              href={'/auth/terms-of-service'}
              variant={'smallLink'}
            >
              Terms of Service
            </Typography>
            and
            <Typography
              href={'/auth/privacy-policy'}
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
