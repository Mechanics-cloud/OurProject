module.exports = {
  extends: [
    '@it-incubator/eslint-config',
    'plugin:jest/recommended',
    'plugin:@next/next/recommended',
  ],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'lf',
      },
    ],
  },
}
