/* jshint node:true */
'use strict';

module.exports = {
  extends: 'recommended',
  rules: {
    'no-nested-interactive': {
      ignoredTags: ['label'] // Allow label tag inside a or any other interactive element
    },
    'link-rel-noopener': true,
    // TODO: Remove and fix
    'require-button-type': false,
    'no-partial': false,
    'require-valid-alt-text': false,
    'no-inline-styles': false,
    'no-negated-condition': false,
    'no-invalid-meta': false, // Crashing the linter https://github.com/ember-template-lint/ember-template-lint/pull/1087
    'no-curly-component-invocation': false,
  },
  overrides: [
    {
      files: ['**/app/templates/account/**/*.hbs', '**/app/templates/events/**/*.hbs'],
      rules: {
        'no-curly-component-invocation': true,
      }
    },
  ]
};
