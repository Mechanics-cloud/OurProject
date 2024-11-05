import { Paths, getBaseLayout } from '@/common'
import { withRedirectForAuthorize } from '@/common/HOC/withRedirectForAuthorize'
import { generalStore } from '@/core/store'
import { SignUpForm } from '@/features/auth'
import Router from 'next/router'

const SignUp = () => {
  if (generalStore.user) {
    Router.push(Paths.profile)
  }

  return <SignUpForm />
}

SignUp.getLayout = getBaseLayout

export default withRedirectForAuthorize(SignUp)
