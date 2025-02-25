export const PublicPaths = {
  expiredSession: '/auth/expired-session',
  forgotPassword: '/auth/forgot-password',
  privacyPolicy: '/auth/privacy-policy',
  profile: '/profile',
  profileLink: (userId: number | undefined) => {
    return `/profile/${userId}`
  },
  publicMainPage: '/',
  recoveryPassword: '/auth/recovery',
  registrationEmailResending: '/auth/registration-email-resending',
  signIn: '/auth/sign-in',
  signUp: '/auth/sign-up',
  termsOfService: '/auth/terms-of-service',
  userPost: '/profile/:userId/:postId',
  userProfile: '/profile/:userId',
}

export const ProtectedPaths = {
  favorites: '/favorites',
  generalInfo: '/settings',
  home: '/home',
  messenger: '/messenger',
  profileSettings: '/profile/settings/general',
  publication: '/publication',
  search: '/search',
  statistics: '/statistics',
}
