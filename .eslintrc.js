module.exports = {
  env: {
    es2021: true,
    node: true,
    commonjs: true,
  },
  extends: ['airbnb-base', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    quotes: ['error', 'single'],
    'no-console': 'off',
    'max-len': ['warn', { code: 100 }],
    semi: 'warn',
    'comma-dangle': 'error',
  },
};
