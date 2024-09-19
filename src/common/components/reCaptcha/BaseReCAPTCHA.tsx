import ReCAPTCHA, { ReCAPTCHAProps } from 'react-google-recaptcha'

export const BaseReCAPTCHA = ({ theme = 'dark', ...rest }: ReCAPTCHAProps) => {
  return (
    <ReCAPTCHA
      style={{ colorScheme: 'initial' }}
      theme={theme}
      {...rest}
    />
  )
}
