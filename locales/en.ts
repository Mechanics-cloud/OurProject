import {
  basic,
  createPost,
  expiredSession,
  forgotPassword,
  recoveryPassword,
  registration,
  signIn,
  signUp,
} from '@locales/translations/en'

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

  basic: { ...basic },

  createPost: { ...createPost },
  expiredSession: { ...expiredSession },
  forgotPassword: { ...forgotPassword },

  homePage: {
    addComments: 'Add a comment',
    emptyPostsButton: 'Find friends',
    like: 'Like',
    likes: 'Likes',
    loading: 'Loading...',
    noPostsAlt: 'No posts',
    noPostsText:
      "The feed is empty. To see your friends' posts, you need to follow them.",
    publish: 'Publish',
    viewAllComments: 'View All Comments',
  },

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
    profileSettings: 'Profile settings',
    search: 'Search',
    statistics: 'Statistics',
    unfollow: 'Unfollow',
  },
  notFoundButton: 'Go back',
  notFoundText:
    'There seems to be nothing here. You can go back or use the menu.',
  pagination: {
    goBack: 'Go Back',
    goForward: 'Go forward',
  },
  post: {
    modalText: 'Are you sure you want to delete this post?',
    modalTitle: 'Delete Post',
    no: 'No',
    successMessage: 'The post was successfully deleted',
    yes: 'Yes',
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
    noPosts: {
      alt: 'No user post image',
      button: 'Add new post',
      strangeText: 'The user has not published any posts yet',
      userText: 'Your feed is empty. Publish your first post',
    },
    publications: 'Publications',
    settingsButton: 'Profile settings',
  },
  profileSessions: {
    activeSessions: 'Active sessions',
    currentSession: 'Current device',
    lastVisit: 'Last visit',
    terminateAll: 'Terminate all other session',
  },

  recoveryPassword: { ...recoveryPassword },
  registration: { ...registration },

  session: {
    activeSession: 'Active session',
    currentDevice: 'Current device',
    devices: 'Devices',
    lastVisit: 'Last visit',
    logOut: 'Log out',
    successLogout: 'The session was successfully completed',
    terminateAll: 'Terminate all other session',
  },
  showText: {
    less: 'Hide',
    more: 'Show more',
  },
  signIn: { ...signIn },
  signUp: { ...signUp },
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
  userCounter: {
    text: 'Registered users:',
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
