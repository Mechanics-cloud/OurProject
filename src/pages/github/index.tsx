import { useEffect, useState } from 'react'
import * as React from 'react'
import { toast } from 'react-toastify'

import notFound from '@/assets/images/notFound.svg'
import {
  BaseLayoutWithStore,
  Button,
  FullScreenLoader,
  Paths,
  Typography,
  responseErrorHandler,
  useTranslation,
  withProtection,
} from '@/common'
import { StorageKeys } from '@/common/enums'
import { setToLocalStorage } from '@/common/utils/localStorage'
import { authStore } from '@/features/auth'
import Image from 'next/image'
import { useRouter } from 'next/router'

const GitHubCallback = () => {
  const router = useRouter()
  const { t } = useTranslation()
  const [isLoginViaGithub, setIsLoginViaGithub] = useState<boolean>(true)
  const onSignInHandler = () => {
    router.push(`${Paths.signIn}`)
  }

  useEffect(() => {
    debugger
    const { accessToken } = router.query

    if (router.isReady) {
      if (accessToken) {
        setToLocalStorage(StorageKeys.AccessToken, accessToken as string)
        authStore.me().then(() => router.push(`${Paths.home}`))
      } else {
        setIsLoginViaGithub(false)
        responseErrorHandler(new Error('Авторизация через GitHub невозможна'))
      }
    }
  }, [router])

  return isLoginViaGithub ? (
    <BaseLayoutWithStore>
      <FullScreenLoader />
    </BaseLayoutWithStore>
  ) : (
    <BaseLayoutWithStore
      className={'flex justify-center items-center w-full h-headCalc'}
    >
      <div
        className={
          'mt-20 lg:mt-40 flex flex-col gap-8 items-center justify-center'
        }
      >
        <Image
          alt={'404 image'}
          className={'opacity-90'}
          height={500}
          src={notFound}
          width={500}
        />
        <Typography
          className={'m-auto text-center font-normal'}
          variant={'h1'}
        >
          {t.basic.notFoundTitle}
        </Typography>
        <Button onClick={onSignInHandler}>{t.basic.pagination.goBack}</Button>
      </div>
    </BaseLayoutWithStore>
  )
}

export default GitHubCallback
