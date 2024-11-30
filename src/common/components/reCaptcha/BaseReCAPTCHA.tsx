import { ElementRef, forwardRef } from 'react'
// eslint-disable-next-line import/no-named-as-default
import ReCAPTCHA, { ReCAPTCHAProps } from 'react-google-recaptcha'

import { Environments } from '@/common/enviroments'

// valid key
const RECAPTCHA_KEY = Environments.RECAPTCHA_KEY as string

export const BaseReCAPTCHA = forwardRef<
  ElementRef<typeof ReCAPTCHA>,
  Omit<ReCAPTCHAProps, 'sitekey'>
>(({ theme = 'dark', ...rest }, ref) => {
  return (
    <ReCAPTCHA
      ref={ref}
      style={{ colorScheme: 'initial' }}
      theme={theme}
      {...rest}
      sitekey={RECAPTCHA_KEY}
    />
  )
})
