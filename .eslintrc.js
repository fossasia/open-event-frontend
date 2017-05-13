module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: "module",
    allowImportExportEverywhere: false
  },
  extends: [
    'eslint:recommended',
    'plugin:ember-suave/recommended'
  ],
  env: {
    'browser': true
  },
  rules: {
    'space-before-blocks': 'error',
    'comma-dangle': ['error', 'never'],
    'space-in-parens': ['error', 'never'],
    'space-before-function-paren': ['error', 'never'],
    'comma-spacing': ['error', { 'before': false, 'after': true }],
    'semi': ['error', 'always', {'omitLastInOneLineBlock': true}],
    'semi-spacing': ['error', {'before': false, 'after': true}],
    'keyword-spacing': ['error', { 'before': true, 'after': true }],
    'spaced-comment': ['error', 'always'],
    'object-shorthand': ['error', 'always'],
    'dot-notation': 'error',
    'arrow-parens': ['error', 'as-needed'],
    'object-curly-spacing': ['error', 'always'],
    'space-infix-ops': 'error',
    'no-multiple-empty-lines': ['error', { 'max': 2, 'maxEOF': 1 }],
    'key-spacing': [
      'error', {
        'align': {
          'beforeColon': true,
          'afterColon': true,
          'on': 'colon'
        }
      }
    ],
    'operator-linebreak': ['error', 'before'],
    'array-bracket-spacing': ['error', 'never'],
    'no-trailing-spaces': 'error',
    'brace-style': ['error', '1tbs', { 'allowSingleLine': true }],
    'max-statements-per-line': ['error', { 'max': 2 }],
    'quotes': ['error', 'single'],
    'no-var': 'off',
    'indent': [
      'error', 2, {
        "FunctionExpression": {"parameters": "first"},
        "FunctionDeclaration": {"parameters": "first"},
        "MemberExpression": 1,
        "SwitchCase": 1,
        "outerIIFEBody": 0,
        "VariableDeclarator": { "var": 2, "let": 2, "const": 3 }
      }
    ],
    'max-len': 'off',
    'no-console': 'error',
    'prefer-template': 'error',
    'camelcase': 'off',
    'new-cap': 'off',
    'eqeqeq': ['error', 'smart'],
    'one-var': 'off',
    'ember-suave/no-const-outside-module-scope': 'off',
    'ember-suave/require-access-in-comments': 'off'
  },
  globals: {
    module     : true,
    process    : true,
    wysihtml5  : true,
    palette    : true,
    Uint8Array : true,
    require    : true
  }
};
