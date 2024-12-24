export const expiredSession = {
  emailExpired: 'Email verification link expired',
  pictureExpired: 'Picture of the expired link',
  resendLink: 'Resend Link',
  sendLinkAgain:
    'Looks like the verification link has expired. Not to worry, we can send the link again',
}

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

export const recoveryPassword = {
  createNewPassword: 'Create New Password',
  newPassword: 'New Password',
  passwordChanged: 'Password was successfully changed!',
  passwordConfirmation: 'Password confirmation',
  passwordValidation: 'Your password must be between 6 and 20 characters',
}

export const registration = {
  confirmation: {
    buttonTitle: 'Sign in',
    text: 'Your email has been confirmed',
    title: 'Congratulations!',
  },
  expired: {
    buttonTitle: 'Resend verification link',
    text: 'Looks like the verification link has expired. Not to worry, we can send the link again',
    title: 'Email verification link expired',
  },
}

export const signIn = {
  errorResponse: 'The email or password are incorrect. Try again please',
  labelEmail: 'Email',
  labelPassword: 'Password',
  passwordRecovery: 'Forgot Password',
  placeholderPassword: 'Enter your password',
  signUpTitle: 'Sign Up',
  text: 'Don’t have an account?',
  title: 'Sign In',
}

export const signUp = {
  confirmSignUpModal: {
    getDescription: (userEmail: string) => {
      return `We have sent a link to confirm your email to ${userEmail}`
    },
    title: 'Email sent',
  },
  labels: {
    agree: 'I agree to the',
    and: 'and',
    confirm: 'Password confirmation',
    email: 'Email',
    password: 'Password',
    userName: 'User name',
  },
  placeholders: {
    confirm: 'Password confirmation',
    email: 'Enter your email',
    password: 'Enter a password',
    userName: 'Enter your username',
  },
  policy: 'Privacy Policy',
  schemaErrors: {
    userNameComposition: 'Input must contain only',
  },
  signUpGithub: 'Sign Up with Github',
  signUpGoogle: 'Sign Up with Google',
  terms: 'Terms of Service',
  text: 'Do you have an account?',
  title: 'Sign Up',
}
