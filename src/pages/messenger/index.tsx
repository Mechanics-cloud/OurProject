import { withProtection } from '@/common'
import { MessengerWithProvider as Messenger } from '@/features/messenger'

function MessengerPage() {
  return <Messenger />
}

export default withProtection(MessengerPage)
