import { Card, withProtection } from '@/common'
import { RecoveryPasswordForm } from '@/features/auth'

function RecoveryPassword() {
  return (
    <Card
      className={
        'mt-[132px] w-full mx-auto box-border p-6 border-transparent bg-transparent md:bg-dark-500 md:border md:border-dark-300 md:w-[378px]'
      }
    >
      <RecoveryPasswordForm />
    </Card>
  )
}

export default withProtection(RecoveryPassword, true, true)
