import { withProtection } from '@/common'
import SignInForm from '@/features/auth/ui/SignInForm'

const SignIn = () => {
  return <SignInForm />
}

export default withProtection(SignIn, {
  forUnauthorizedUsers: true,
  isPublic: true,
})
