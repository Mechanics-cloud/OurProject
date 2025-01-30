import React, { useState } from 'react'

import { Close } from '@/assets/icons'
import anonymous from '@/assets/images/user-avatar-placeholder.jpg'
import {
  Button,
  Nullable,
  TextArea,
  Typography,
  useTranslation,
} from '@/common'
import { generalStore } from '@/core/store'
import { usePostStore } from '@/features/posts'
import { PostSlider } from '@/features/posts/ui/PostModal/Slider/PostSlider'
import Image from 'next/image'

//todo: translation for Button
export const EditPost = ({
  openConfirmModal,
}: {
  openConfirmModal: () => void
}) => {
  const { postStore } = usePostStore()
  const [postText, setPostText] = useState<Nullable<string>>(
    postStore.post?.description || null
  )
  const { t } = useTranslation()
  const post = postStore.post
  const maxDescriptionLength = 500

  const onPostTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostText(e.target.value)
  }

  const onSaveClick = async () => {
    if (postText) {
      await postStore.editPostDescription(postText)
    }
  }

  return (
    <div className={'flex flex-col w-full h-full bg-dark-300 '}>
      <div
        className={
          "flex items-center justify-between p-[0.75rem] w-full relative after:absolute after:content-[''] after:block after:w-full after:h-px after:bg-dark-100 after:left-0 after:bottom-0"
        }
      >
        <Typography variant={'h1'}>Edit Post</Typography>
        <Close
          className={'w-6 h-6 cursor-pointer mr-1.5'}
          onClick={openConfirmModal}
        />
      </div>
      <div className={'flex w-full h-full'}>
        <PostSlider />
        <div className={'flex flex-col w-full h-full p-6 justify-between'}>
          <div className={'flex flex-col gap-3'}>
            <div className={'flex items-center gap-3'}>
              <Image
                alt={`Post owner avatar`}
                className={'rounded-full pr-0'}
                height={36}
                priority
                src={post?.avatarOwner || anonymous}
                width={36}
              />
              <Typography variant={'reg16'}>{post?.userName}</Typography>
            </div>
            <div>
              <TextArea
                className={'h-[120px] resize-none'}
                disabled={generalStore.isLoading}
                label={t.createPost.publication.description}
                maxLength={maxDescriptionLength}
                onChange={onPostTextChange}
                value={postText ? postText : ''}
              />
              <Typography
                className={'text-light-900 text-right'}
                variant={'small'}
              >
                {postText?.length}/{maxDescriptionLength}
              </Typography>
            </div>
          </div>
          <Button
            className={'max-w-[160px] ml-auto'}
            onClick={onSaveClick}
          >
            Save changes
          </Button>
        </div>
      </div>
    </div>
  )
}
