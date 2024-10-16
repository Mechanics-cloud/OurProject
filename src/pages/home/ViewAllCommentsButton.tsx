import React, { useEffect, useState } from 'react'

import { responseErrorHandler } from '@/common/utils/responseErrorHandler'

import { postsApi } from './posts/posts.api'

type ViewAllCommentsButtonType = {
  postId: number
}

const ViewAllCommentsButton = ({ postId }: ViewAllCommentsButtonType) => {
  const [commentCount, setCommentCount] = useState<null | number>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const count = await postsApi.postIdComments({ postId })

        setCommentCount(count.totalCount)
      } catch (error) {
        responseErrorHandler(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchComments()
  }, [postId])

  console.log(commentCount)

  const isButtonDisabled =
    isLoading || commentCount === null || commentCount === 0

  return (
    <div className={'w-full h-6 mb-3'}>
      <button
        disabled={isButtonDisabled}
        type={'button'}
      >
        <span className={'text-[14px] font-bold leading-[24px] text-light-900'}>
          {isLoading
            ? 'Loading...'
            : `View All Comments (${commentCount || 0})`}
        </span>
      </button>
    </div>
  )
}

export default ViewAllCommentsButton
