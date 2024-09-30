import {
  Button,
  Card,
  Loader,
  Typography,
  typographyVariants,
  useTranslation,
} from '@/common'
import { FormCheckbox, FormTextField } from '@/common/form'
import { Paths } from '@/common/paths'
import { cn } from '@/common/utils/cn'
import { useSignUp } from '@/features/auth/model/useSignUp'
import { ConfirmSignUpModal } from '@/features/auth/ui/ConfirmSignUpModal'
import { ExternalServicesRegistration } from '@/features/auth/ui/ExternalServicesRegistration'
import Link from 'next/link'

export const SignUpForm = () => {
  const { t } = useTranslation()
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
          {t.signUpForm.title}
        </Typography>
        <ExternalServicesRegistration />

        <form
          className={'min-w-80'}
          onSubmit={onSubmit}
        >
          <FormTextField
            control={control}
            label={t.signUpForm.labels.userName}
            name={'userName'}
            placeholder={t.signUpForm.placeholders.userName}
          />
          <FormTextField
            control={control}
            error={errors.email?.message}
            label={t.signUpForm.labels.email}
            name={'email'}
            placeholder={t.signUpForm.placeholders.email}
          />
          <FormTextField
            control={control}
            error={errors.password?.message}
            label={t.signUpForm.labels.password}
            name={'password'}
            placeholder={t.signUpForm.placeholders.password}
            type={'password'}
          />
          <FormTextField
            control={control}
            error={errors.confirm?.message}
            label={t.signUpForm.labels.confirm}
            name={'confirm'}
            placeholder={t.signUpForm.placeholders.confirm}
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
              label={t.signUpForm.labels.agree}
              name={'agreesToTOS'}
              typographyVariant={'small'}
            />
            <Typography
              href={Paths.termsOfService}
              variant={'smallLink'}
            >
              {t.signUpForm.terms}
            </Typography>
            {t.signUpForm.labels.and}
            <Typography
              href={Paths.privacyPolicy}
              variant={'smallLink'}
            >
              {t.signUpForm.policy}
            </Typography>
          </div>
          <Button
            className={'w-full mb-[18px]'}
            disabled={!isValid}
            type={'submit'}
          >
            {t.signUp}
          </Button>
        </form>

        <ConfirmSignUpModal
          isOpen={isOpen}
          onModalClose={onModalClose}
          userEmail={userEmail}
        />

        <div className={'flex flex-col gap-4 items-center'}>
          <span>{t.signUpForm.text}</span>
          <Button
            asChild
            variant={'text'}
          >
            <Link
              className={cn(
                typographyVariants({ variant: 'h3' }),
                'grow text-accent-500 w-full text-center'
              )}
              href={Paths.signIn}
            >
              {t.signIn}
            </Link>
          </Button>
        </div>
      </Card>
    </>
  )
}