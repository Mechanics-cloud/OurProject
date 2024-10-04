import { ElementRef, forwardRef } from 'react'
// eslint-disable-next-line import/no-named-as-default
import ReCAPTCHA, { ReCAPTCHAProps } from 'react-google-recaptcha'

// valid key
const RECAPTCHA_KEY = '6LeY2y0mAAAAANwI_paCWfoksCgBm1n2z9J0nwNQ'

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
