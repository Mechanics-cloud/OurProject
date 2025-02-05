import React from 'react'
import { useForm, useWatch } from 'react-hook-form'

import anonymous from '@/assets/images/user-avatar-placeholder.jpg'
import {
  Button,
  FormTextArea,
  PathService,
  PublicPaths,
  Typography,
  useTranslation,
} from '@/common'
import { PostSlider, usePostStore } from '@/features/posts'
import Image from 'next/image'
import Link from 'next/link'

export const MobileEdit = () => {
  const { t } = useTranslation()
  const { postStore } = usePostStore()
  const maxDescriptionLength = 500

  const { control } = useForm<{ description: string }>({
    defaultValues: {
      description: postStore.post?.description || '',
    },
  })

  const description = useWatch({ control, name: 'description' })

  return (
    <>
      <div className={'flex items-center justify-between w-full'}>
        <Button variant={'text'}>Cancel</Button>
        <Typography variant={'h2'}>{t.post.editPost}</Typography>
        <Button variant={'text'}>Save</Button>
      </div>
      <PostSlider className={'mt-[19px] mb-3 px-9'} />
      <div className={'flex items-center gap-3 w-full mb-6'}>
        <Link
          href={PathService.generatePath(PublicPaths.userProfile, {
            userId: postStore.post?.ownerId,
          })}
        >
          <Image
            alt={`Post owner avatar`}
            className={'rounded-full pr-0'}
            height={36}
            priority
            src={postStore.post?.avatarOwner || anonymous}
            width={36}
          />
        </Link>
        <Typography variant={'h3'}>{postStore.post?.userName}</Typography>
      </div>
      <form className={'w-full'}>
        <FormTextArea
          className={'h-[120px] resize-none'}
          control={control}
          label={t.post.editDescription}
          maxLength={maxDescriptionLength}
          name={'description'}
        />
        <div className={'flex items-center w-full'}>
          {description?.length === maxDescriptionLength && (
            <Typography
              className={'text-red-500 text-right'}
              variant={'small'}
            >
              {t.post.maxLengthMessage}
            </Typography>
          )}
          <Typography
            className={'text-light-900 text-right ml-auto'}
            variant={'small'}
          >
            {description?.length}/{maxDescriptionLength}
          </Typography>
        </div>
      </form>
    </>
  )
}
