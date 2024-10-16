import { Card, getBaseLayout } from '@/common'
import { withRedirectForAuthorize } from '@/common/HOC/withRedirectForAuthorize'
import { ForgotPasswordForm } from '@/features/auth'

function ForgotPassword() {
  return (
    <Card
      className={
        'mt-[132px] w-full mx-auto box-border p-6 border-transparent bg-transparent md:bg-dark-500 md:border md:border-dark-300 md:w-[378px]'
      }
    >
      <ForgotPasswordForm />
    </Card>
  )
}

ForgotPassword.getLayout = getBaseLayout

export default withRedirectForAuthorize(ForgotPassword)
