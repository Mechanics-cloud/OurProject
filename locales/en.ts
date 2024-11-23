import { LocaleType } from './ru'

export const en: LocaleType = {
  actionIconsGroup: {
    addFavorite: 'Add to Favorites',
    isLiked: 'Like',
    message: 'Message',
    share: 'Share',
  },
  avatarModal: {
    chooseButton: 'Select from Computer',
    errors: {
      chooseFile: 'Choose file.',
      error: 'Error!',
      fileSize: 'Photo size must be less than 10 MB!',
      fileType: 'The format of the uploaded photo must be PNG or JPG/JPEG.',
      unknownError: 'Unknown error.',
    },
    saveButton: 'Save',
    title: 'Add a Profile Photo',
  },
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
  goToTop: 'Go to top',
  homePage: {
    addComments: 'Add a Comments...',
    like: 'Like',
    likes: 'Likes',
    loading: 'Loading...',
    publish: 'Publish',
    viewAllComments: 'View All Comments',
  },
  logIn: 'Log In',
  menu: {
    copyLink: 'Copy Link',
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
    unfollow: 'Unfollow',
  },
  notFoundButton: 'Go back',
  pagination: {
    goBack: 'Go Back',
    goForward: 'Go forward',
  },
  profileInputs: {
    aboutMe: 'About me',
    addProfilePhoto: 'Add a profile photo',
    city: 'Select your city',
    country: 'Select your country',
    dateOfBirth: 'Date of birth',
    firstName: 'First name',
    lastName: 'Last name',
    placeholders: {
      city: 'City',
      country: 'Country',
    },
    saveChanges: 'Save changes',
    updateStatusMessages: {
      error: 'Something went wrong',
      success: 'Your settings are saved!',
    },
    userName: 'User name',
  },
  profilePage: {
    followers: 'Followers',
    following: 'Following',
    publications: 'Publications',
    settingsButton: 'Profile settings',
  },
  profileSessions: {
    activeSessions: 'Active sessions',
    currentSession: 'Current device',
    lastVisit: 'Last visit',
    terminateAll: 'Terminate all other session',
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
  session: {
    activeSession: 'Active session',
    currentDevice: 'Current device',
    devices: 'Devices',
    lastVisit: 'Last visit',
    logOut: 'Log out',
    terminateAll: 'Terminate all other session',
  },
  showText: {
    less: 'Hide',
    more: 'Show more',
  },
  signIn: 'Sign In',
  signInForm: {
    errorResponse: 'The email or password are incorrect. Try again please',
    labelEmail: 'Email',
    labelPassword: 'Password',
    passwordRecovery: 'Forgot Password',
    placeholderPassword: 'Enter your password',
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
  },
  slider: {
    noText: 'No pictures for this post!',
  },
  tabs: {
    accountManagement: 'Account management',
    devices: 'Devices',
    generalInfo: 'General information',
    myPayments: 'My payments',
  },
  termsPolicyPage: {
    back: 'Back',
  },
  validation: {
    email: {
      composition: 'The email must match the format example@example.com',
      required: 'Email is required',
    },
    password: {
      composition: 'Password must contain',
      match: 'Passwords must match',
      maxChar: 'Maximum number of characters 20',
      minChar: 'Minimum number of characters 6',
    },
    recaptchaRequired: 'Recaptcha is required',
  },
}
