export const forgotPassword = {
  buttonTitle: 'Send Link',
  description:
    'Enter your email address and we will send you further instructions',
  emailPlaceholder: 'Enter your email address',
  link: 'Back to Sign In',
  modalContent: {
    getText: (userEmail: string) => {
      return `We have sent a link to confirm your email to ${userEmail}`
    },
  },
  modalTitle: 'Email sent',
  resentEmail:
    'The link has been sent by email. If you don’t receive an email send link again',
  sendAgain: 'Send Link Again',
  title: 'Forgot Password',
}
