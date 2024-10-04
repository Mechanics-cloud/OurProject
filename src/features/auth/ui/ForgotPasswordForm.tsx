import {
  BaseReCAPTCHA,
  Button,
  FormTextField,
  Paths,
  Typography,
  useTranslation,
} from '@/common'
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
  const { t } = useTranslation()

  return (
    <form
      className={'flex flex-col items-center w-full gap-4'}
      onSubmit={onSubmit}
    >
      <Typography variant={'h1'}>{t.forgotPassword.title}</Typography>
      <div className={'flex flex-col w-full items-center gap-2 mt-6'}>
        <FormTextField
          className={'mb-0  w-full'}
          control={control}
          error={errors.email?.message}
          label={'Email'}
          name={'email'}
          placeholder={t.forgotPassword.emailPlaceholder}
          type={'email'}
        />
        <Typography
          className={'text-light-900'}
          variant={'reg14'}
        >
          {t.forgotPassword.description}
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
          {t.forgotPassword.buttonTitle}
        </Button>

        <Button
          asChild
          className={'w-full'}
          variant={'text'}
        >
          <Link href={Paths.signIn}>{t.forgotPassword.link}</Link>
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
