import { withProtection } from '@/common'

function Publication() {
  return (
    <div className={'flex flex-col justify-center items-center h-screen'}>
      Publication
    </div>
  )
}

export default withProtection(Publication)
