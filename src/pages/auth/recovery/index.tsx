import { Card, getBaseLayout } from '@/common'
import { RecoveryPasswordForm } from '@/features/auth'

function RecoveryPassword() {
  return (
    <Card
      className={
        'mt-[132px] w-[378px] mx-auto box-border p-6 border-transparent bg-transparent md:bg-dark-500 md:border md:border-dark-300'
      }
    >
      <RecoveryPasswordForm />
    </Card>
  )
}

RecoveryPassword.getLayout = getBaseLayout

export default RecoveryPassword
