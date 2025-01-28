export const Paths = {
  expiredSession: '/auth/expired-session',
  favorites: '/favorites',
  forgotPassword: '/auth/forgot-password',
  generalInfo: '/settings',
  home: '/home',
  messenger: '/messenger',
  privacyPolicy: '/auth/privacy-policy',
  profile: '/profile',
  profileLink: (userId: number | undefined) => {
    return `/profile/${userId}`
  },
  profileSettings: '/profile/settings',
  publicMainPage: '/',
  recoveryPassword: '/auth/recovery',
  registrationEmailResending: '/auth/registration-email-resending',
  search: '/search',
  signIn: '/auth/sign-in',
  signUp: '/auth/sign-up',
  statistics: '/statistics',
  termsOfService: '/auth/terms-of-service',
  userPost: '/profile/:userId/:postId',
  userProfile: '/profile/:userId',
}
