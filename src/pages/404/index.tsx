import { Button, useTranslation } from '@/common'
import { withProtection } from '@/common/HOC/withProtection'
import Image from 'next/image'
import { useRouter } from 'next/router'

function NotFound() {
  const { t } = useTranslation()
  const router = useRouter()
  const onBackHandler = () => {
    router.back()
  }

  return (
    <div className={'h-full mt-60 flex flex-col items-center justify-center'}>
      <Image
        alt={'404 image'}
        height={500}
        src={'/404.png'}
        width={500}
      />
      <Button
        className={'mt-14'}
        onClick={onBackHandler}
      >
        {t.notFoundButton}
      </Button>
    </div>
  )
}

export default withProtection(NotFound, true)
