const errors = {
  emptyImages:
    'Failed to display post photos. Please contact support or try again later!',
  emptySlider: 'No pictures',
  server: 'Something went wrong on our end. Please try again later.',
  tooBigFile: (size: number) =>
    `File is too big. Photo size must be less than ${size}MB`,
  type: (types: string) => `Wrong file type. You can upload ${types}`,
  unknown: 'Something went wrong',
}

export const basic = {
  discard: 'Discard',
  errors: { ...errors },
  goToTop: 'Go to top',
  logOut: 'Log Out',
  next: 'Next',
  no: 'No',
  notFoundTitle:
    'There seems to be nothing here. You can go back or use the menu.',
  pagination: {
    goBack: 'Go back',
    goForward: 'Go forward',
  },
  textFolding: {
    less: 'Hide',
    more: 'Show more',
  },
  userCounter: 'Registered users:',
  welcome: 'Welcome! Please sign in.',
  yes: 'Yes',
}
