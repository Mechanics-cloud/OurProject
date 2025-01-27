import { Environments } from '@/common'
import { responseErrorHandler } from '@/common/utils/responseErrorHandler'
import { Endpoints, authStore } from '@/features/auth'
import { useGoogleLogin } from '@react-oauth/google'

export const useOAuth = () => {
  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onError: () => {
      responseErrorHandler('Oops something went wrong')
    },
    onSuccess: async (credentialResponse) => {
      if (credentialResponse.code) {
        try {
          await authStore.authWithGoogle(credentialResponse.code)
        } catch (error) {
          responseErrorHandler(error)
        }
      }
    },
  })

  const githubLogin = () => {
    window.location.assign(`${Environments.API_URL}${Endpoints.AuthWithGithub}`)
  }

  return { githubLogin, googleLogin }
}
