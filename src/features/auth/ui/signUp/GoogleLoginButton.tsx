import React from 'react'

import { generalStore } from '@/app/store'
import { GoogleSvgrepoCom1 } from '@/assets/icons/filledIcons'
import { Paths } from '@/common'
import { responseErrorHandler } from '@/common/utils/responseErrorHandler'
import authStore from '@/features/auth/model/authStore'
import { useGoogleLogin } from '@react-oauth/google'
import { useRouter } from 'next/router'

export const GoogleLoginButton = React.forwardRef<HTMLButtonElement>(
  (_, ref) => {
    const router = useRouter()

    const isLoading = generalStore

    const login = useGoogleLogin({
      flow: 'auth-code',
      onError: () => {
        responseErrorHandler('Oops something went wrong')
      },
      onSuccess: async (credentialResponse) => {
        if (credentialResponse.code) {
          try {
            isLoading.turnOnLoading()
            const res = await authStore.authWithGoogle(credentialResponse.code)

            isLoading.turnOffLoading()
            if (res?.data.accessToken) {
              await router.push(Paths.profile)
            }
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
  }
)
