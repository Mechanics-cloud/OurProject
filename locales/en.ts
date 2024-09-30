import { LocaleType } from './ru'

export const en: LocaleType = {
  logIn: 'Log In',
  menu: {
    create: 'Create',
    favorites: 'Favorites',
    home: 'Home',
    logOut: 'Log Out',
    messenger: 'Messenger',
    profile: 'Profile',
    search: 'Search',
    statistics: 'Statistics',
  },
  pagination: {
    goBack: 'Go Back',
    goForward: 'Go forward',
  },
  signIn: 'Sign In',
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
}
