import { withProtection } from '@/common'

function Messenger() {
  return (
    <div className={'flex flex-col justify-center items-center h-screen'}>
      Messenger
    </div>
  )
}

export default withProtection(Messenger)
