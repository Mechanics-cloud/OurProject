import { Menu, withProtection } from '@/common'

function Messenger() {
  return (
    <div className={'flex flex-col justify-center items-center h-screen'}>
      <Menu />
    </div>
  )
}

export default withProtection(Messenger)
