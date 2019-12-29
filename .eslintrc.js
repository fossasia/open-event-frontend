module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  plugins: [
    'ember'
  ],
  extends: [
    'eslint:recommended',
    'plugin:ember-suave/recommended'
  ],
  env: {
    browser: true
  },
  rules: {
    'arrow-spacing': 'error',
    'no-var': 'error',
    'no-useless-escape': 'off',
    'no-await-in-loop': 'off',
    'import/no-relative-parent-imports': 'off',
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
    'no-console': ["error", { allow: ["warn", "error"] }],
    'prefer-template': 'error',
    'camelcase': 'off',
    'new-cap': 'off',
    'eqeqeq': ['error', 'smart'],
    'one-var': 'off',
    'ember-suave/no-const-outside-module-scope': 'off',
    'ember-suave/require-access-in-comments': 'off',
    'ember-suave/lines-between-object-properties': 'off',
    'ember-suave/no-direct-property-access': 'off',
    'ember/no-get': 'error',
  },
  globals: {
    module     : true,
    process    : true,
    wysihtml5  : true,
    palette    : true,
    Uint8Array : true,
    require    : true,
    Promise    : true
  },
  overrides: [
    // node files
    {
      files: [
        '.eslintrc.js',
        '.template-lintrc.js',
        'ember-cli-build.js',
        'testem.js',
        'blueprints/*/index.js',
        'config/**/*.js',
        'lib/*/index.js',
        'server/**/*.js'
      ],
      parserOptions: {
        sourceType: 'script',
        ecmaVersion: 2015
      },
      env: {
        browser: false,
        node: true
      },
      plugins: ['node'],
      rules: Object.assign({}, require('eslint-plugin-node').configs.recommended.rules, {
        // add your custom rules and overrides for node files here

        // this can be removed once the following is fixed
        // https://github.com/mysticatea/eslint-plugin-node/issues/77
        'node/no-unpublished-require': 'off',
        'node/no-extraneous-require': 'off'
      })
    }
  ]
};
