import { Menu, withProtection } from '@/common'

function Publication() {
  return (
    <div className={'flex flex-col justify-center items-center h-screen'}>
      <Menu />
    </div>
  )
}

export default withProtection(Publication)
