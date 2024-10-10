import { Button, FormTextField, Typography, useTranslation } from '@/common'
import { useRecoveryPassword } from '@/features/auth/model/forgotPassword/useRecoveryPassword'

export const RecoveryPasswordForm = () => {
  const { t } = useTranslation()
  const { control, errors, isSubmitting, isValid, onSubmit } =
    useRecoveryPassword()

  return (
    <div className={'flex flex-col items-center w-full gap-4'}>
      {/* Title */}
      <Typography variant={'h1'}>
        {t.recoveryPassword.createNewPassword}
      </Typography>

      {/* Form */}
      <form
        className={'flex flex-col w-full items-center mt-6'}
        onSubmit={onSubmit}
      >
        <FormTextField
          className={'w-full mb-0'}
          control={control}
          disabled={isSubmitting}
          error={errors.password?.message}
          label={t.recoveryPassword.newPassword}
          name={'password'}
          placeholder={t.recoveryPassword.newPassword}
          type={'password'}
        />
        <FormTextField
          className={'w-full mb-0'}
          control={control}
          disabled={isSubmitting}
          error={errors.confirm?.message}
          label={t.recoveryPassword.passwordConfirmation}
          name={'confirm'}
          placeholder={t.recoveryPassword.passwordConfirmation}
          type={'password'}
        />
        <Typography
          className={'text-light-900'}
          variant={'reg14'}
        >
          {t.recoveryPassword.passwordValidation}
        </Typography>

        <Button
          className={'w-full mt-10'}
          disabled={!isValid || isSubmitting}
          type={'submit'}
          variant={'primary'}
        >
          {t.recoveryPassword.createNewPassword}
        </Button>
      </form>
    </div>
  )
}
