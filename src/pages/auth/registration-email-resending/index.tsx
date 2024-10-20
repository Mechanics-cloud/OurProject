import { getBaseLayout } from '@/common'
import { withRedirectForAuthorize } from '@/common/HOC/withRedirectForAuthorize'
import RegistrationExpired from '@/features/auth/ui/signUp/RegistrationExpired'

const Expired = () => {
  return (
    <div className={'md:mt-9 mt-4'}>
      <RegistrationExpired />
    </div>
  )
}

Expired.getLayout = getBaseLayout

export default withRedirectForAuthorize(Expired)
