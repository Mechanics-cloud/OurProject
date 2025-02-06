import { SubmitHandler, useForm, useWatch } from 'react-hook-form'
import { toast } from 'react-toastify'

import { useModal, useTranslation } from '@/common'
import { usePostStore } from '@/features/posts'

export const useEditMode = () => {
  const { postStore } = usePostStore()
  const { stopEditing } = postStore
  const { t } = useTranslation()
  const post = postStore.post
  const maxDescriptionLength = 500

  const {
    control,
    formState: { isDirty, isSubmitting },
    handleSubmit,
  } = useForm<{ description: string }>({
    defaultValues: {
      description: post?.description || '',
    },
  })

  const description = useWatch({ control, name: 'description' })

  const onSaveClick: SubmitHandler<{ description: string }> = async (data) => {
    try {
      if (data) {
        await postStore.editPostDescription(data.description)
        toast.success(t.post.successPostUpdate)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const onCloseClick = () => {
    if (isDirty) {
      openConfirmModal()
    } else {
      postStore.stopEditing()
    }
  }

  const {
    isModalOpen,
    onModalClose: closeConfirmModal,
    openModal: openConfirmModal,
  } = useModal()

  const onCancelEdit = () => {
    stopEditing()
  }

  return {
    closeConfirmModal,
    control,
    description,
    isDirty,
    isModalOpen,
    isSubmitting,
    maxDescriptionLength,
    onCancelEdit,
    onCloseClick,
    onSubmit: handleSubmit(onSaveClick),
    post,
    stopEditing,
    t,
  }
}
