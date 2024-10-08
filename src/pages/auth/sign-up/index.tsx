import { Paths, getBaseLayout } from '@/common'
import { SignUpForm } from '@/features/auth'
import authStore from '@/features/auth/model/authStore'
import Router from 'next/router'

const SignUp = () => {
  if (authStore.profile) {
    Router.push(Paths.profile)
  }

  return (
    <div
      className={
        'md:mt-[24px] mt-4 md:w-[378px] mx-auto box-border border-transparent'
      }
    >
      <SignUpForm />
    </div>
  )
}

SignUp.getLayout = getBaseLayout

export default SignUp
