import React from 'react'

import { GithubSvgrepoCom31 } from '@/assets/icons/filledIcons'
import { Environments, Tooltip, useTranslation } from '@/common'
import { Endpoints } from '@/features/auth'
import { GoogleLoginButton } from '@/features/auth/ui/signUp/GoogleLoginButton'

export const ExternalServicesRegistration = () => {
  const { t } = useTranslation()

  const handleLoginWithGithub = () => {
    window.location.assign(`${Environments.API_URL}${Endpoints.AuthWithGithub}`)
  }

  return (
    <div className={'flex gap-14 justify-center mb-6 mt-4'}>
      <Tooltip title={t.signUpForm.signUpGoogle}>
        <GoogleLoginButton />
      </Tooltip>

      <Tooltip title={t.signUpForm.signUpGithub}>
        <button
          onClick={handleLoginWithGithub}
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
