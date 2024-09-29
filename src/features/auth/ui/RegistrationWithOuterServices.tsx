import {
  GithubSvgrepoCom31,
  GoogleSvgrepoCom1,
} from '@/assets/icons/filledIcons'
import { Tooltip, Typography } from '@/common'

type Props = {
  title: string
}
export const ExternalServicesRegistration = ({ title }: Props) => {
  return (
    <>
      <Typography
        className={'text-center mb-3'}
        variant={'h1'}
      >
        {title}
      </Typography>
      <div className={'flex gap-14 mb-6 justify-center'}>
        <Tooltip title={'Sing Up with Google'}>
          <button type={'button'}>
            <GoogleSvgrepoCom1
              height={36}
              width={36}
            />
          </button>
        </Tooltip>

        <Tooltip title={'Sing Up with GitHub'}>
          <button type={'button'}>
            <GithubSvgrepoCom31
              height={36}
              width={36}
            />
          </button>
        </Tooltip>
      </div>
    </>
  )
}
