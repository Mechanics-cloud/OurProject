import ReCAPTCHA, { ReCAPTCHAProps } from 'react-google-recaptcha'

export const BaseReCAPTCHA = ({
  sitekey = '6Ld5J0gqAAAAAIO074PfmvJimeKugXCNtJoX0CHu',
  theme = 'dark',
  ...rest
}: ReCAPTCHAProps) => {
  return (
    <ReCAPTCHA
      sitekey={sitekey}
      style={{ colorScheme: 'initial' }}
      theme={theme}
      {...rest}
    />
  )
}
