module.exports = {
  extends: [
    '@it-incubator/eslint-config',
    'plugin:jest/recommended',
    'plugin:@next/next/recommended',
  ],
  rules: {
    'import/no-cycle': ['error', { maxDepth: 1 }],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'lf',
      },
    ],
  },
}
