module.exports = {
  root: true,
  extends: [
    'airbnb-base',
    'plugin:cypress/recommended',
  ],
  env: {
    browser: true,
  },
  rules: {
    'no-alert': 0,
    'no-param-reassign': [2, { props: false }],
    'no-plusplus': 0,
    'no-iterator': 0,
    'no-restricted-syntax': [2, 'WithStatement'],
    'func-style': 0,
    'no-unused-vars': 'off',
    'no-new': 'off',
    'no-use-before-define': 'off',
    'no-console': 'off',
    'no-restricted-globals': 'off',
    'max-len': 'off',
    'guard-for-in': 'off',
    'import/no-cycle': 'off',
  },
};
