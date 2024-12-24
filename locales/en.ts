import {
  actionIconsGroup,
  avatarModal,
  basic,
  createPost,
  expiredSession,
  forgotPassword,
  homePage,
  menu,
  post,
  profilePage,
  profileSessions,
  profileSettings,
  profileSettingsTabs,
  recoveryPassword,
  registration,
  signIn,
  signUp,
  validation,
} from '@locales/translations/en'

import { LocaleType } from './ru'

export const en: LocaleType = {
  actionIconsGroup: { ...actionIconsGroup },

  avatarModal: { ...avatarModal },
  basic: { ...basic },
  createPost: { ...createPost },
  expiredSession: { ...expiredSession },
  forgotPassword: { ...forgotPassword },
  homePage: { ...homePage },
  menu: { ...menu },
  post: { ...post },
  profilePage: { ...profilePage },
  profileSessions: { ...profileSessions },
  profileSettings: { ...profileSettings },
  profileSettingsTabs: { ...profileSettingsTabs },
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

  signIn: { ...signIn },
  signUp: { ...signUp },
  validation: { ...validation },
}
