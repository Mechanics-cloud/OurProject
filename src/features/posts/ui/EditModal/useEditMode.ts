import { FieldValues, SubmitHandler, useForm, useWatch } from 'react-hook-form'
import { toast } from 'react-toastify'

import { useModal, useTranslation } from '@/common'
import { usePostStore } from '@/features/posts'

export const useEditMode = () => {
  const { postStore } = usePostStore()
  const { post, stopEditing } = postStore
  const { t } = useTranslation()
  const maxDescriptionLength = 500

  const {
    control,
    formState: { isDirty, isSubmitting },
    handleSubmit,
  } = useForm<FieldValues>({
    defaultValues: {
      description: post?.description || '',
    },
  })

  const description = useWatch({ control, name: 'description' })

  const onSaveClick: SubmitHandler<FieldValues> = async (data) => {
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

  return {
    closeConfirmModal,
    control,
    description,
    isDirty,
    isModalOpen,
    isSubmitting,
    maxDescriptionLength,
    onCloseClick,
    onSubmit: handleSubmit(onSaveClick),
    post,
    stopEditing,
    t,
  }
}
