import ReCAPTCHA, { ReCAPTCHAProps } from 'react-google-recaptcha' // eslint-disable-line

export const BaseReCAPTCHA = ({ theme = 'dark', ...rest }: ReCAPTCHAProps) => {
  return (
    <ReCAPTCHA
      style={{ colorScheme: 'initial' }}
      theme={theme}
      {...rest}
    />
  )
}
