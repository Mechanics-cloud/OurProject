import { ChangeEvent, useState } from 'react'

import { responseErrorHandler } from '@/common'

export const useAddComment = (onSubmit: (comment: string) => Promise<void>) => {
  const [comment, setComment] = useState('')

  const onBlur = () => {
    setComment(comment.trim())
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value)
  }

  const handleSubmit = async () => {
    try {
      const trimmedComment = comment.trim()

      if (trimmedComment) {
        await onSubmit(trimmedComment)
        setComment('')
      }
    } catch (error) {
      responseErrorHandler(error)
    }
  }

  return {
    comment,
    onBlur,
    onChange,
    onSubmit: handleSubmit,
  }
}
