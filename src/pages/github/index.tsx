import { useEffect } from 'react'

import { Loader } from '@/common'
import { Environments } from '@/common/enviroments'
import axios from 'axios'
import { useRouter } from 'next/router'

export const fetchUser = async (accessToken: string) => {
  return axios.get(`${Environments.BASE_URL}/v1/auth/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  })
}

const GitHubCallback = () => {
  const router = useRouter()

  useEffect(() => {
    if (router.query.accessToken) {
      const { accessToken, email } = router.query

      if (accessToken) {
        localStorage.setItem('accessToken', accessToken as string)
        fetchUser(accessToken as string).then((res) => {
          console.log(res)
          router.push('/profile')
        })
      } else {
        console.error('No access token')
      }
    }
  }, [router, router.query])

  return <Loader />
}

export default GitHubCallback
