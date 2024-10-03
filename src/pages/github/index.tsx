import { useEffect } from 'react'

import { Loader } from '@/common'
import axios from 'axios'
import { useRouter } from 'next/router'

const GitHubCallback = () => {
  const router = useRouter()

  const fetchUser = async (accessToken: string) => {
    return axios.get('https://inctagram.work/api/v1/auth/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  }

  useEffect(() => {
    if (router.query.accessToken) {
      const { accessToken, email } = router.query

      if (accessToken) {
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
