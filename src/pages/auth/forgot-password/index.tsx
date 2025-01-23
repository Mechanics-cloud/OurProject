import { Card, withProtection } from '@/common'
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

export default withProtection(ForgotPassword, {
  forUnauthorizedUsers: true,
  isPublic: true,
})
