import { withProtection } from '@/common'
import RegistrationExpired from '@/features/auth/ui/signUp/RegistrationExpired'

const Expired = () => {
  return (
    <div className={'md:mt-9 mt-4'}>
      <RegistrationExpired />
    </div>
  )
}

export default withProtection(Expired, false, true)
