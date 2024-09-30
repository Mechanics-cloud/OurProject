import { Button, Card, Loader, Typography, typographyVariants } from '@/common'
import { FormCheckbox, FormTextField } from '@/common/form'
import { cn } from '@/common/utils/cn'
import { useSignUp } from '@/features/auth/model/useSignUp'
import { ConfirmSignUpModal } from '@/features/auth/ui/ConfirmSignUpModal'
import { ExternalServicesRegistration } from '@/features/auth/ui/ExternalServicesRegistration'
import Link from 'next/link'

export const SignUpForm = () => {
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
    <>
      {isLoading && <Loader />}
      <Card className={'pt-6 pb-7'}>
        <Typography
          className={'text-center mb-3'}
          variant={'h1'}
        >
          Sign Up
        </Typography>
        <ExternalServicesRegistration />

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
            disabled={!isValid}
            type={'submit'}
          >
            Sign Up
          </Button>
        </form>

        <ConfirmSignUpModal
          isOpen={isOpen}
          onModalClose={onModalClose}
          userEmail={userEmail}
        />

        <div className={'flex flex-col gap-4 items-center'}>
          <span>Do you have an account?</span>
          <Button
            asChild
            variant={'text'}
          >
            <Link
              className={cn(
                typographyVariants({ variant: 'h3' }),
                'grow text-accent-500 w-full text-center'
              )}
              href={'/auth/sign-in'}
            >
              Sign in
            </Link>
          </Button>
        </div>
      </Card>
    </>
  )
}
