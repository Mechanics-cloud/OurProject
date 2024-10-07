import React from 'react'

import { generalStore } from '@/app/store'
import {
  GithubSvgrepoCom31,
  GoogleSvgrepoCom1,
} from '@/assets/icons/filledIcons'
import { Environments, Tooltip, useTranslation } from '@/common'
import { responseErrorHandler } from '@/common/utils/responseErrorHandler'
import { Endpoints, authApi } from '@/features/auth'
import authStore from '@/features/auth/model/authStore'
import { useGoogleLogin } from '@react-oauth/google'
import { useRouter } from 'next/router'

const GoogleLoginButton = React.forwardRef<HTMLButtonElement>((_, ref) => {
  const router = useRouter()

  const isLoading = generalStore

  const login = useGoogleLogin({
    flow: 'auth-code',
    onError: () => {},
    onSuccess: async (credentialResponse) => {
      if (credentialResponse.code) {
        try {
          isLoading.turnOnLoading()
          const res = await authApi.authWithGoogle(credentialResponse.code)

          localStorage.setItem('accessToken', res.data.accessToken)
          await authStore.me(res.data.accessToken)
          router.push('/profile')
        } catch (error) {
          responseErrorHandler(error)
        } finally {
          isLoading.turnOffLoading()
        }
      }
    },
  })

  return (
    <button
      onClick={() => login()}
      ref={ref}
      type={'button'}
    >
      <GoogleSvgrepoCom1
        height={36}
        width={36}
      />
    </button>
  )
})

export const ExternalServicesRegistration = () => {
  const { t } = useTranslation()

  const handleLoginWithGithub = () => {
    window.location.assign(`${Environments.API_URL}${Endpoints.AuthWithGithub}`)
  }

  return (
    <div className={'flex gap-14 justify-center mb-6 mt-4'}>
      <Tooltip title={t.signUpForm.signUpGoogle}>
        <GoogleLoginButton />
      </Tooltip>

      <Tooltip title={t.signUpForm.signUpGithub}>
        <button
          onClick={handleLoginWithGithub}
          type={'button'}
        >
          <GithubSvgrepoCom31
            height={36}
            width={36}
          />
        </button>
      </Tooltip>
    </div>
  )
}
