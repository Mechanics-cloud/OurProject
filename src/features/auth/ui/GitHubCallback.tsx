import githubError from '@/assets/images/serverError.svg'
import {
  Button,
  FullScreenLoader,
  PublicPaths,
  Typography,
  useTranslation,
} from '@/common'
import { useGitHubCallback } from '@/features/auth/model/gitHub/useGitHubCallback'
import Image from 'next/image'
import Link from 'next/link'

export const GitHubCallback = () => {
  const { t } = useTranslation()
  const { isLoginViaGithub } = useGitHubCallback()

  if (isLoginViaGithub) {
    return <FullScreenLoader />
  }

  return (
    <>
      <div
        className={
          'mt-20 lg:mt-40 flex flex-col gap-8 items-center justify-center'
        }
      >
        <Image
          alt={'github error image'}
          className={'opacity-90'}
          height={500}
          src={githubError}
          width={500}
        />
        <Typography
          className={'m-auto text-center font-normal'}
          variant={'h1'}
        >
          {t.basic.errors.unknown}
        </Typography>
        <Button
          asChild
          className={'md:mb-[72px] mb-0 self-stretch md:self-auto'}
        >
          <Link href={PublicPaths.signIn}>
            {t.registration.confirmation.buttonTitle}
          </Link>
        </Button>
      </div>
    </>
  )
}
