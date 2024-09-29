import { getLayout } from '@/common'
import { SignUpForm } from '@/features/auth/ui/SignUpForm'

const SignUp = () => {
  return (
    <div className={'w-full h-full flex justify-center items-center'}>
      <SignUpForm />
    </div>
  )
}

SignUp.getLayout = getLayout

export default SignUp
