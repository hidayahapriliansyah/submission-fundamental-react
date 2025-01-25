module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: 'airbnb',
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'react/destructuring-assignment': ['off'],
    'react/sort-comp': ['off'],
    'class-methods-use-this': ['off'],
    'react/no-access-state-in-setstate': 'off',
    'arrow-body-style': 'off',
    'no-alert': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/no-array-index-key': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react/jsx-no-bind': 'off',
  },
};
