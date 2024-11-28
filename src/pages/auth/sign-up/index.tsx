import { withProtection } from '@/common'
import { SignUpForm } from '@/features/auth'

const SignUp = () => {
  return <SignUpForm />
}

export default withProtection(SignUp, true, true)
