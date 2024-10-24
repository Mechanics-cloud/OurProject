import { Paths, getBaseLayout } from '@/common'
import { withRedirectForAuthorize } from '@/common/HOC/withRedirectForAuthorize'
import { SignUpForm } from '@/features/auth'
import authStore from '@/features/auth/model/authStore'
import Router from 'next/router'

const SignUp = () => {
  if (authStore.profile) {
    Router.push(Paths.profile)
  }

  return <SignUpForm />
}

SignUp.getLayout = getBaseLayout

export default withRedirectForAuthorize(SignUp)
