import * as React from 'react'

import { Button, ProtectedPaths, Typography, useTranslation } from '@/common'
import Image from 'next/image'
import Link from 'next/link'

import noPostImage from '/src/assets/images/noPosts.svg'

export const EmptyFeed = () => {
  const { t } = useTranslation()

  return (
    <div className={'flex flex-col gap-8'}>
      <Image
        alt={t.homePage.noPostsAlt}
        className={'w-[700px] m-auto pt-16 lg:mt-16 opacity-90'}
        src={noPostImage}
      />
      <Typography
        className={'m-auto text-center font-normal'}
        variant={'h1'}
      >
        {t.homePage.noPostsText}
      </Typography>
      <Button
        asChild
        className={'text-center m-auto'}
      >
        <Link href={ProtectedPaths.search}>{t.homePage.emptyPostsButton}</Link>
      </Button>
    </div>
  )
}
