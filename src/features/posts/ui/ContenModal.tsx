import { PostModal, usePostStore } from '@/features/posts'
import { EditModal } from '@/features/posts/ui/EditModal/EditModal'
import { observer } from 'mobx-react-lite'

type Props = {
  userProfileId: number
}
export const ContentModal = observer(({ userProfileId }: Props) => {
  const { postStore } = usePostStore()
  const { isEditing } = postStore

  return !isEditing ? (
    <PostModal userProfileId={userProfileId} />
  ) : (
    <EditModal userProfileId={userProfileId} />
  )
})
