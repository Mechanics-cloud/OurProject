import {
  GithubSvgrepoCom31,
  GoogleSvgrepoCom1,
} from '@/assets/icons/filledIcons'
import {
  Button,
  Card,
  FormCheckbox,
  FormTextField,
  Loader,
  Tooltip,
  Typography,
  typographyVariants,
} from '@/common'
import { cn } from '@/common/utils/cn'
import { useSignUp } from '@/features/signUp/model/useSignUp'
import { ConfirmSignUpModal } from '@/features/signUp/ui/ConfirmSignUpModal'
import Link from 'next/link'

const SignUp = () => {
  const {
    control,
    errors,
    isLoading,
    isOpen,
    isValid,
    onModalClose,
    onSubmit,
    userEmail,
  } = useSignUp()

  return (
    <div className={'h-screen grid place-items-center'}>
      {isLoading && <Loader />}
      <Card className={'pt-6 pb-7'}>
        <Typography
          className={'text-center mb-3'}
          variant={'h1'}
        >
          Sign Up
        </Typography>
        <div className={'flex gap-14 mb-6 justify-center'}>
          <Tooltip title={'Sing Up with Google'}>
            <button type={'button'}>
              <GoogleSvgrepoCom1
                height={36}
                width={36}
              />
            </button>
          </Tooltip>

          <Tooltip title={'Sing Up with GitHub'}>
            <button type={'button'}>
              <GithubSvgrepoCom31
                height={36}
                width={36}
              />
            </button>
          </Tooltip>
        </div>

        <form
          className={'min-w-80'}
          onSubmit={onSubmit}
        >
          <FormTextField
            control={control}
            label={'Username'}
            name={'userName'}
            placeholder={'Enter your username'}
          />
          <FormTextField
            control={control}
            error={errors.email?.message}
            label={'Email'}
            name={'email'}
            placeholder={'Enter your email'}
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
            disabled={!isValid || isLoading}
            type={'submit'}
          >
            Sign Up
          </Button>
          <ConfirmSignUpModal
            isOpen={isOpen}
            onModalClose={onModalClose}
            userEmail={userEmail}
          />
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
