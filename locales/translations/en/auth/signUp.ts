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
