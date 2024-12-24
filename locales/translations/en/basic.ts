const errors = {
  server: 'Something went wrong on our end. Please try again later.',
  tooBigFile: (size: number) => `File is too big. Max size is ${size}MB`,
  type: 'Wrong file type',
  unknown: 'Something went wrong',
}

export const basic = {
  discard: 'Discard',
  errors: { ...errors },
  goToTop: 'Go to top',
  next: 'Next',
  welcome: 'Welcome! Please sign in.',
}
