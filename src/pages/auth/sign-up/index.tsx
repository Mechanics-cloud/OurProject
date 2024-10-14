import { Loader, Paths, getBaseLayout } from '@/common'
import { withRedirectForAuthorize } from '@/common/HOC/withRedirectForAuthorize'
import { generalStore } from '@/core/store'
import { SignUpForm } from '@/features/auth'
import authStore from '@/features/auth/model/authStore'
import Router from 'next/router'

const SignUp = () => {
  if (authStore.profile) {
    Router.push(Paths.profile)
  }
  const { isLoading } = generalStore

  return (
    <div
      className={
        'md:mt-[24px] mt-4 md:w-[378px] mx-auto box-border border-transparent'
      }
    >
      {isLoading && <Loader />}
      <SignUpForm />
    </div>
  )
}

SignUp.getLayout = getBaseLayout

export default withRedirectForAuthorize(SignUp)
