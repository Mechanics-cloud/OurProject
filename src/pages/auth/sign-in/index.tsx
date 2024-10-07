import { getBaseLayout } from '@/common'
import SignInForm from '@/features/auth/ui/SignInForm'

const SignIn = () => {
  return <SignInForm />
}

SignIn.getLayout = getBaseLayout

export default SignIn
