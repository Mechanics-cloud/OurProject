import { LocaleType } from './ru'

export const en: LocaleType = {
  basicError: 'Something went wrong',
  expiredSession: {
    emailExpired: 'Email verification link expired',
    pictureExpired: 'Picture of the expired link',
    resendLink: 'Resend Link',
    sendLinkAgain:
      'Looks like the verification link has expired. Not to worry, we can send the link again',
  },
  forgotPassword: {
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
  },
  logIn: 'Log In',
  menu: {
    create: 'Create',
    favorites: 'Favorites',
    home: 'Home',
    logOut: 'Log Out',
    logOutModal: {
      getText: (userEmail: string) => {
        return `Are you really want to log out of your account "${userEmail}"?`
      },
      no: 'No',
      title: 'Log Out',
      yes: 'Yes',
    },
    messenger: 'Messenger',
    profile: 'Profile',
    search: 'Search',
    statistics: 'Statistics',
  },
  notFoundButton: 'Go back',
  pagination: {
    goBack: 'Go Back',
    goForward: 'Go forward',
  },
  recoveryPassword: {
    createNewPassword: 'Create New Password',
    newPassword: 'New Password',
    passwordChanged: 'Password was successfully changed!',
    passwordConfirmation: 'Password confirmation',
    passwordValidation: 'Your password must be between 6 and 20 characters',
  },
  registration: {
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
  },
  signIn: 'Sign In',
  signInForm: {
    errorResponse: 'The email or password are incorrect. Try again please',
    labelEmail: 'Email',
    labelPassword: 'Password',
    passwordRecovery: 'Forgot Password',
    signUpTitle: 'Sign Up',
    text: 'Don’t have an account?',
    title: 'Sign In',
  },
  signUp: 'Sign Up',
  signUpForm: {
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
      confirm: 'Confirm your password',
      email: 'Enter your email',
      password: 'Enter your password',
      userName: 'Enter your username',
    },
    policy: 'Privacy Policy',
    signUpGithub: 'Sign Up with Github',
    signUpGoogle: 'Sign Up with Google',
    terms: 'Terms of Service',
    text: 'Do you have an account?',
    title: 'Sign Up',
  },
  termsPolicyPage: {
    back: 'Back',
  },
  validation: {
    recaptchaRequired: 'Recaptcha is required',
  },
}
