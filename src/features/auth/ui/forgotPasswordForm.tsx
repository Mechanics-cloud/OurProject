import { BaseReCAPTCHA, Button, FormTextField, Typography } from '@/common'
import { useForgotPassword } from '@/features/auth'
import Link from 'next/link'

export const ForgotPasswordForm = () => {
  const {
    control,
    errors,
    isValid,
    onChangeRecaptcha,
    onResetRecaptcha,
    onSubmit,
    recaptchaRef,
  } = useForgotPassword()

  return (
    <form
      className={'flex flex-col items-center w-full gap-4'}
      onSubmit={onSubmit}
    >
      <Typography variant={'h1'}>Forgot Password</Typography>
      <div className={'flex flex-col w-full items-center gap-2 mt-6'}>
        <FormTextField
          className={'mb-0  w-full'}
          control={control}
          error={errors.email?.message}
          label={'Email'}
          name={'email'}
          placeholder={'Enter your email address'}
          type={'email'}
        />
        <Typography
          className={'text-light-900'}
          variant={'reg14'}
        >
          Enter your email address and we will send you further instructions
        </Typography>
      </div>

      <div className={'flex flex-col w-full items-center gap-6'}>
        <Button
          className={'w-full'}
          disabled={!isValid}
          onClick={onSubmit}
          type={'submit'}
          variant={'primary'}
        >
          Send Link
        </Button>

        {/*TODO replace link to SignIn Page*/}
        <Button
          asChild
          className={'w-full'}
          variant={'text'}
        >
          <Link href={'/'}>Back to Sign In</Link>
        </Button>

        <BaseReCAPTCHA
          onChange={onChangeRecaptcha}
          onExpired={onResetRecaptcha}
          ref={recaptchaRef}
        />
      </div>
    </form>
  )
}
