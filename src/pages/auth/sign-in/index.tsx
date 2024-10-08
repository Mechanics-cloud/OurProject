import { Paths, getBaseLayout } from '@/common'
import authStore from '@/features/auth/model/authStore'
import SignInForm from '@/features/auth/ui/SignInForm'
import Router from 'next/router'

const SignIn = () => {
  if (authStore.profile) {
    Router.push(Paths.profile)
  }

  return <SignInForm />
}

SignIn.getLayout = getBaseLayout

export default SignIn
