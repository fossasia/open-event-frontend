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
    minifyHTML: {
      enabled   : true,
      htmlFiles : ['index.html', '404.html']
    },
    SemanticUI: {
      source: {
        css        : 'bower_components/open-event-frontend-theme/dist',
        javascript : 'bower_components/open-event-frontend-theme/dist',
        images     : 'bower_components/open-event-frontend-theme/dist/themes/default/assets/images',
        fonts      : 'bower_components/open-event-frontend-theme/dist/themes/default/assets/fonts'
      }
    }
  });

  app.import('bower_components/semantic-ui-calendar/dist/calendar.min.css');
  app.import('bower_components/semantic-ui-calendar/dist/calendar.min.js');
  app.import('bower_components/wysihtml/dist/wysihtml-toolbar.min.js');
  app.import('bower_components/Croppie/croppie.css');
  app.import('bower_components/Croppie/croppie.min.js');

  const appTree = app.toTree([]);
  return new MergeTrees([appTree, new Funnel(appTree, {
    files: ['index.html'],

    getDestinationPath() {
      return '404.html';
    }
  })]);
};
