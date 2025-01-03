import { Environments, Paths } from '@/common'
import { responseErrorHandler } from '@/common/utils/responseErrorHandler'
import { generalStore } from '@/core/store'
import { Endpoints, authStore } from '@/features/auth'
import { useGoogleLogin } from '@react-oauth/google'
import { useRouter } from 'next/router'

export const useOAuth = () => {
  const router = useRouter()

  const isLoading = generalStore

  const googleLogin = useGoogleLogin({
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
          if (res?.res.data.accessToken) {
            await router.push(`${Paths.profile}/${res.userInfo?.userId}`)
          }
        } catch (error) {
          responseErrorHandler(error)
        } finally {
          isLoading.turnOffLoading()
        }
      }
    },
  })

  const githubLogin = () => {
    window.location.assign(`${Environments.API_URL}${Endpoints.AuthWithGithub}`)
  }

  return { githubLogin, googleLogin }
}
