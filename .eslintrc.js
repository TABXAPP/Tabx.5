module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    jest: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'no-console': 'off',
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'semi': ['error', 'never'],
    'comma-dangle': ['error', 'never'],
    'space-before-function-paren': ['error', 'always'],
    'no-trailing-spaces': 'error',
    'eol-last': 'error'
  },
  ignorePatterns: [
    'node_modules/',
    'dist/',
    'coverage/',
    'logs/'
  ]
}