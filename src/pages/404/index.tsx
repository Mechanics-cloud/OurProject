import * as React from 'react'

import { Button, Typography, useTranslation } from '@/common'
import { withProtection } from '@/common/HOC/withProtection'
import Image from 'next/image'
import { useRouter } from 'next/router'

import notFound from '/src/assets/images/notFound.svg'

function NotFound() {
  const { t } = useTranslation()
  const router = useRouter()
  const onBackHandler = () => {
    router.back()
  }

  return (
    <div className={'mt-40 flex flex-col gap-8 items-center justify-center'}>
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
        {t.notFoundText}
      </Typography>
      <Button onClick={onBackHandler}>{t.notFoundButton}</Button>
    </div>
  )
}

export default withProtection(NotFound, {
  isPublic: true,
})
