import { withProtection } from '@/common/HOC/withProtection'
import { Menu } from '@/common/components/menu'

function Messenger() {
  return (
    <div className={'flex flex-col justify-center items-center h-screen'}>
      <Menu />
    </div>
  )
}

export default withProtection(Messenger, true)
