import Expired from '@/assets/images/registration/expired.webp'
import {
  Button,
  Paths,
  Typography,
  useTranslation,
  withProtection,
} from '@/common'
import Image from 'next/image'
import Link from 'next/link'

const ExpiredSession = () => {
  const { t } = useTranslation()

  return (
    <div className={'mt-[35px] flex flex-col gap-[30px] items-center'}>
      <div className={'flex flex-col gap-5 max-w-[300px]'}>
        <Typography
          className={'text-center'}
          variant={'h1'}
        >
          {t.expiredSession.emailExpired}
        </Typography>
        <Typography
          className={'text-center'}
          variant={'reg16'}
        >
          {t.expiredSession.sendLinkAgain}
        </Typography>
        <Button
          asChild
          className={'w-full mb-2.5'}
        >
          <Link href={Paths.forgotPassword}>{t.expiredSession.resendLink}</Link>
        </Button>
      </div>
      <Image
        alt={t.expiredSession.pictureExpired}
        height={353}
        src={Expired}
        width={473}
      />
    </div>
  )
}

export default withProtection(ExpiredSession, {
  isPublic: true,
})
