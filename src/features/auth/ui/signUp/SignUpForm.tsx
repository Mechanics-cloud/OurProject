import {
  Button,
  Card,
  Typography,
  typographyVariants,
  useTranslation,
} from '@/common'
import { FormCheckbox, FormTextField } from '@/common/form'
import { Paths } from '@/common/paths'
import { cn } from '@/common/utils/cn'
import {
  AgreementWithTheTerms,
  ConfirmSignUpModal,
  ExternalServicesRegistration,
} from '@/features/auth'
import { useSignUp } from '@/features/auth/model'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'

export const SignUpForm = observer(() => {
  const { t } = useTranslation()

  const {
    control,
    isLoading,
    isModalOpen,
    isValid,
    onModalClose,
    onSubmit,
    userEmail,
  } = useSignUp(t)

  return (
    <div
      className={
        'md:mt-[24px] mt-4 md:w-[378px] mx-auto box-border border-transparent'
      }
    >
      <Card className={'pt-6 pb-7 contents md:block'}>
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
            disabled={isLoading}
            label={t.signUpForm.labels.userName}
            name={'userName'}
            placeholder={t.signUpForm.placeholders.userName}
          />
          <FormTextField
            control={control}
            disabled={isLoading}
            label={t.signUpForm.labels.email}
            name={'email'}
            placeholder={t.signUpForm.placeholders.email}
          />
          <FormTextField
            control={control}
            disabled={isLoading}
            label={t.signUpForm.labels.password}
            name={'password'}
            placeholder={t.signUpForm.placeholders.password}
            type={'password'}
          />
          <FormTextField
            control={control}
            disabled={isLoading}
            label={t.signUpForm.labels.confirm}
            name={'confirm'}
            placeholder={t.signUpForm.placeholders.confirm}
            type={'password'}
          />
          <div className={'mb-3'}>
            <FormCheckbox
              control={control}
              disabled={isLoading}
              id={'agreement'}
              label={<AgreementWithTheTerms />}
              name={'agreesToTOS'}
              typographyVariant={'small'}
            />
          </div>
          <Button
            className={'w-full mb-[18px]'}
            disabled={!isValid || isLoading}
            type={'submit'}
          >
            {t.signUp}
          </Button>
        </form>

        <ConfirmSignUpModal
          isOpen={isModalOpen}
          onModalClose={onModalClose}
          userEmail={userEmail}
        />

        <div className={'flex flex-col gap-3 items-center'}>
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
    </div>
  )
})
