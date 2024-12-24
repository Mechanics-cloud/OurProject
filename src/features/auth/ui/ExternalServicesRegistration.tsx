import React from 'react'

import {
  GithubSvgrepoCom31,
  GoogleSvgrepoCom1,
} from '@/assets/icons/filledIcons'
import { Tooltip, useTranslation } from '@/common'
import { useOAuth } from '@/features/auth/model/useOAuth'

export const ExternalServicesRegistration = () => {
  const { t } = useTranslation()
  const { githubLogin, googleLogin } = useOAuth()

  return (
    <div className={'flex gap-14 justify-center mb-6 mt-4'}>
      <Tooltip title={t.signUp.signUpGoogle}>
        <button
          onClick={googleLogin}
          type={'button'}
        >
          <GoogleSvgrepoCom1
            height={36}
            width={36}
          />
        </button>
      </Tooltip>

      <Tooltip title={t.signUp.signUpGithub}>
        <button
          onClick={githubLogin}
          type={'button'}
        >
          <GithubSvgrepoCom31
            height={36}
            width={36}
          />
        </button>
      </Tooltip>
    </div>
  )
}
