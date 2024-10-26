import React, { useEffect, useState } from 'react'

import { Button, typographyVariants } from '@/common'
import { responseErrorHandler } from '@/common/utils/responseErrorHandler'

import { postsApi } from './posts/posts.api'

const AddCommentGroup = () => {
  const [commentCount, setCommentCount] = useState<null | number>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const posts = await postsApi.publicPosts({
          endCursorPostId: 10,
          pageNumber: 1,
          pageSize: 10,
        })

        setCommentCount(posts)
      } catch (error) {
        responseErrorHandler(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchComments()
  }, [])

  // console.log(commentCount)

  return (
    <div className={'w-full flex  justify-between'}>
      <input
        className={
          'placeholder-light-900 text-[14px] font-400  leading-[24px] w-full'
        }
        placeholder={'Add a Comments...'}
        type={'text'}
      ></input>
      <Button
        className={typographyVariants({ variant: 'h3' })}
        variant={'text'}
      >
        Publish
      </Button>
    </div>
  )
}

export default AddCommentGroup
