import { withProtection } from '@/common'
import { RegistrationConfirmation } from '@/features/auth/ui/signUp/RegistrationConfirmation'

const Confirmation = () => {
  return (
    <div className={'md:mt-9 mt-4'}>
      <RegistrationConfirmation />
    </div>
  )
}

export default withProtection(Confirmation, {
  forUnauthorizedUsers: true,
  isPublic: true,
})
