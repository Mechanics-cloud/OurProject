import { getBaseLayout } from '@/common'
import { RegistrationConfirmation } from '@/features/auth/ui/RegistrationConfirmation'

const Confirmation = () => {
  return (
    <div className={'md:mt-9 mt-4'}>
      <RegistrationConfirmation />
    </div>
  )
}

Confirmation.getLayout = getBaseLayout

export default Confirmation
