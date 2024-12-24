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
} from '@locales/translations/ru'

export const ru = {
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
    activeSession: 'Активные сессии',
    currentDevice: 'Текущее устройство',
    devices: 'Устройства',
    lastVisit: 'Последнее посещение',
    logOut: 'Выйти',
    successLogout: 'Сессия была успешно завершена',
    terminateAll: 'Завершить все остальные сеансы',
  },

  signIn: { ...signIn },
  signUp: { ...signUp },
  validation: { ...validation },
}

export type LocaleType = typeof ru
