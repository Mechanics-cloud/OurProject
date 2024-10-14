import { getBaseLayout } from '@/common'
import { withRedirectForAuthorize } from '@/common/HOC/withRedirectForAuthorize'
import SignInForm from '@/features/auth/ui/SignInForm'

const SignIn = () => {
  return <SignInForm />
}

SignIn.getLayout = getBaseLayout

export default withRedirectForAuthorize(SignIn)
