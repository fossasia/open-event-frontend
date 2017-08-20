/* eslint-env node */
const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const MergeTrees = require('broccoli-merge-trees');
const Funnel = require('broccoli-funnel');

module.exports = function(defaults) {
  const app = new EmberApp(defaults, {
    'ember-cli-babel': {
      includePolyfill: true
    },
    storeConfigInMeta : false,
    flexibility       : {
      enabled: true
    },
    autoprefixer: {
      browsers : ['Firefox >= 20', 'Chrome >=20', 'Explorer >= 10', 'Android >= 4.0', 'Safari >= 7', 'iOS >= 5'],
      cascade  : false
    },
    minifyHTML: {
      enabled   : true,
      htmlFiles : ['index.html', '404.html']
    }
  });

  app.import('bower_components/semantic-ui-calendar/dist/calendar.min.css');
  app.import('bower_components/semantic-ui-calendar/dist/calendar.min.js');
  app.import('bower_components/wysihtml/dist/wysihtml-toolbar.min.js');
  app.import('bower_components/Croppie/croppie.css');
  app.import('bower_components/Croppie/croppie.min.js');
  app.import('bower_components/tinyColorPicker/jqColorPicker.min.js');
  app.import('bower_components/js-polyfills/xhr.js');

  const appTree = app.toTree([]);
  return new MergeTrees([appTree, new Funnel(appTree, {
    files: ['index.html'],

    getDestinationPath() {
      return '404.html';
    }
  })]);
};
