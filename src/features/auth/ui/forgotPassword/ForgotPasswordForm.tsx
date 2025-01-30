import {
  BaseReCAPTCHA,
  Button,
  FormTextField,
  PublicPaths,
  SimpleModal,
  Typography,
  useTranslation,
} from '@/common'
import { useForgotPassword } from '@/features/auth'
import Link from 'next/link'

export const ForgotPasswordForm = () => {
  const { t } = useTranslation()
  const {
    control,
    email,
    isModalOpen,
    isSubmitting,
    isValid,
    onChangeRecaptcha,
    onExpireRecaptcha,
    onModalClose,
    onSubmit,
    recaptchaRef,
  } = useForgotPassword(t)

  return (
    <div className={'flex flex-col items-center w-full gap-4'}>
      {/* Title */}
      <Typography variant={'h1'}>{t.forgotPassword.title}</Typography>

      {/* Form */}
      <form
        className={'flex flex-col w-full items-center mt-6'}
        onSubmit={onSubmit}
      >
        <FormTextField
          className={'w-full mb-0'}
          control={control}
          disabled={isSubmitting}
          label={'Email'}
          name={'email'}
          placeholder={t.forgotPassword.emailPlaceholder}
          type={'email'}
        />
        <Typography
          className={'text-light-900 mb-4'}
          variant={'reg14'}
        >
          {t.forgotPassword.description}
        </Typography>

        {email && (
          <Typography
            className={'mb-4'}
            variant={'reg14'}
          >
            {t.forgotPassword.resentEmail}
          </Typography>
        )}

        <div className={'flex flex-col w-full items-center gap-6'}>
          <Button
            className={'w-full'}
            disabled={!isValid || isSubmitting}
            type={'submit'}
            variant={'primary'}
          >
            {email ? t.forgotPassword.sendAgain : t.forgotPassword.buttonTitle}
          </Button>

          <Button
            asChild
            className={'w-full'}
            disabled={isSubmitting}
            variant={'text'}
          >
            <Link href={PublicPaths.signIn}>{t.forgotPassword.link}</Link>
          </Button>

          <BaseReCAPTCHA
            onChange={onChangeRecaptcha}
            onExpired={onExpireRecaptcha}
            ref={recaptchaRef}
          />
        </div>
      </form>

      {/* Modal window after send email*/}
      <SimpleModal
        className={'flex flex-col gap-6 mb-6'}
        onOpenChange={onModalClose}
        open={isModalOpen}
        title={t.forgotPassword.modalTitle}
      >
        <Typography variant={'reg16'}>
          {email && t.forgotPassword.modalContent.getText(email)}
        </Typography>
        <Button
          className={'w-max ml-auto'}
          onClick={onModalClose}
        >
          OK
        </Button>
      </SimpleModal>
    </div>
  )
}
