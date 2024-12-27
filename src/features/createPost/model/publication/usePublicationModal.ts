import { toast } from 'react-toastify'

import { responseErrorHandler, useTranslation } from '@/common'
import { generalStore } from '@/core/store'
import { createPostStore } from '@/features/createPost'

export const usePublicationModal = (onPostUpload: () => void) => {
  const { t } = useTranslation()
  const photos = createPostStore.images.allItems

  const onPublishPost = async () => {
    try {
      generalStore.turnOnLoading()
      await createPostStore.uploadPost()
      onPostUpload()
      toast.success(t.createPost.publication.success)
    } catch (error) {
      responseErrorHandler(error)
    } finally {
      generalStore.turnOffLoading()
    }
  }

  return { onPublishPost, photos, t }
}
