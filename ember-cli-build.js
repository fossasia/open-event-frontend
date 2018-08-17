/* eslint-env node */
const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const MergeTrees = require('broccoli-merge-trees');
const Funnel = require('broccoli-funnel');
const { browsers } = require('./config/targets');

let env = process.env.EMBER_ENV || 'development';

module.exports = function(defaults) {
  const app = new EmberApp(defaults, {
    'ember-cli-babel': {
      includePolyfill: true
    },
    storeConfigInMeta : false,
    autoprefixer      : {
      browsers,
      cascade: false
    },
    minifyHTML: {
      enabled   : false,
      htmlFiles : ['index.html', '404.html']
    },
    fingerprint: {
      enabled          : env === 'production',
      generateAssetMap : true,
      extensions       : ['js', 'css', 'png', 'jpg', 'gif', 'map', 'svg', 'json']
    }
  });

  app.import('bower_components/semantic-ui-calendar/dist/calendar.min.css');
  app.import('bower_components/Croppie/croppie.css');

  app.import('bower_components/semantic-ui-calendar/dist/calendar.min.js', {
    using: [{ transformation: 'fastbootShim' }]
  });
  app.import('bower_components/wysihtml/dist/wysihtml-toolbar.min.js', {
    using: [{ transformation: 'fastbootShim' }]
  });
  app.import('bower_components/Croppie/croppie.min.js', {
    using: [{ transformation: 'fastbootShim' }]
  });
  app.import('bower_components/tinyColorPicker/jqColorPicker.min.js', {
    using: [{ transformation: 'fastbootShim' }]
  });
  app.import('bower_components/js-polyfills/xhr.js', {
    using: [{ transformation: 'fastbootShim' }]
  });
  app.import('bower_components/jquery-ui/jquery-ui.js', {
    using: [{ transformation: 'fastbootShim' }]
  });
  app.import('bower_components/jquery-ui/ui/widgets/draggable.js', {
    using: [{ transformation: 'fastbootShim' }]
  });

  const appTree = app.toTree([]);
  return new MergeTrees([appTree, new Funnel(appTree, {
    files: ['index.html'],

    getDestinationPath() {
      return '404.html';
    }
  })]);
};
