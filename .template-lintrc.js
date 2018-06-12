/* jshint node:true */
'use strict';

module.exports = {
  extends: 'recommended',
  rules: {
    'no-nested-interactive': {
      ignoredTags: ['label'] // Allow label tag inside a or any other interactive element
    }
  }
};
