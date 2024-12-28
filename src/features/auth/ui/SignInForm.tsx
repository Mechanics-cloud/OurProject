import { Button, Card, Typography, useTranslation } from '@/common'
import { FormTextField } from '@/common/form'
import { Paths } from '@/common/paths'
import { ExternalServicesRegistration } from '@/features/auth'
import { useSignIn } from '@/features/auth/model/signIn/useSignIn'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'

const SignIn = observer(() => {
  const { t } = useTranslation()

  const { control, isLoading, isValid, onSubmit } = useSignIn(t)

  return (
    <div
      className={
        'md:mt-[36px] mt-4 md:w-[378px] mx-auto box-border border-transparent'
      }
    >
      <Card className={'contents md:block'}>
        <Typography
          className={'text-center'}
          variant={'h1'}
        >
          {t.signIn.title}
        </Typography>
        <ExternalServicesRegistration />
        <form
          className={'flex flex-col w-full h-full'}
          noValidate
          onSubmit={onSubmit}
        >
          <FormTextField
            control={control}
            disabled={isLoading}
            label={t.signIn.labelEmail}
            name={'email'}
            placeholder={'epam@epam.com'}
            type={'email'}
          />
          <FormTextField
            control={control}
            disabled={isLoading}
            label={t.signIn.labelPassword}
            name={'password'}
            placeholder={t.signIn.placeholderPassword}
            type={'password'}
          />

          <Link
            className={'self-end mt-3 mb-6 text-light-900'}
            href={Paths.forgotPassword}
          >
            {t.signIn.passwordRecovery}
          </Link>

          <Button
            disabled={!isValid || isLoading}
            type={'submit'}
          >
            {t.signIn.title}
          </Button>
        </form>
        <div className={'flex flex-col gap-1 items-center mt-4'}>
          <Typography variant={'reg16'}>{t.signIn.text}</Typography>
          <Button
            asChild
            variant={'text'}
          >
            <Link href={Paths.signUp}>{t.signIn.signUpTitle}</Link>
          </Button>
        </div>
      </Card>
    </div>
  )
})

export default SignIn
