import {
  GithubSvgrepoCom31,
  GoogleSvgrepoCom1,
} from '@/assets/icons/filledIcons'
import { Tooltip } from '@/common'

export const ExternalServicesRegistration = () => {
  return (
    <div className={'flex gap-14 justify-center mb-6 mt-4'}>
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
  )
}
