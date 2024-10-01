import {
  GithubSvgrepoCom31,
  GoogleSvgrepoCom1,
} from '@/assets/icons/filledIcons'
import { Tooltip, useTranslation } from '@/common'

export const ExternalServicesRegistration = () => {
  const { t } = useTranslation()

  return (
    <div className={'flex gap-14 justify-center mb-6 mt-4'}>
      <Tooltip title={t.signUpForm.signUpGoogle}>
        <button type={'button'}>
          <GoogleSvgrepoCom1
            height={36}
            width={36}
          />
        </button>
      </Tooltip>

      <Tooltip title={t.signUpForm.signUpGithub}>
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
