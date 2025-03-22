import { withProtection } from '@/common'
import { Messenger } from '@/features/messenger'

function MessengerPage() {
  return <Messenger />
}

export default withProtection(MessengerPage)
