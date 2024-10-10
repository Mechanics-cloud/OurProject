import { Button, Card, Typography } from '@/common'
import { FormTextField } from '@/common/form'
import { Paths } from '@/common/paths'
import { ExternalServicesRegistration } from '@/features/auth'
import { useSignIn } from '@/features/auth/model/signIn/useSignIn'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'

const SignIn = observer(() => {
  const { control, handleSubmit, isLoading, isValid, onSubmit, t } = useSignIn()

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
          {t.signInForm.title}
        </Typography>
        <ExternalServicesRegistration />
        <form
          className={'flex flex-col w-full h-full'}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormTextField
            control={control}
            disabled={isLoading}
            label={t.signInForm.labelEmail}
            name={'email'}
            placeholder={'Epam@epam.com'}
            type={'email'}
          />
          <FormTextField
            control={control}
            disabled={isLoading}
            label={t.signInForm.labelPassword}
            name={'password'}
            placeholder={'**********'}
            type={'password'}
          />

          <Link
            className={'self-end mt-3 mb-6 text-light-900'}
            href={'/*'}
          >
            {t.signInForm.passwordRecovery}
          </Link>

          <Button
            disabled={!isValid || isLoading}
            type={'submit'}
          >
            {t.signInForm.title}
          </Button>
        </form>
        <div className={'flex flex-col gap-1 items-center mt-4'}>
          <Typography variant={'reg16'}>{t.signInForm.text}</Typography>
          <Button
            asChild
            variant={'text'}
          >
            <Link href={Paths.signUp}>{t.signInForm.signUpTitle}</Link>
          </Button>
        </div>
      </Card>
    </div>
  )
})

export default SignIn
