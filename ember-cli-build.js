/* eslint-env node */
const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const MergeTrees = require('broccoli-merge-trees');
const Funnel = require('broccoli-funnel');
const targets = require('./config/targets');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

let env = process.env.EMBER_ENV || 'development';

module.exports = function(defaults) {
  const app = new EmberApp(defaults, {
    'ember-cli-babel': {
      includePolyfill: true
    },
    storeConfigInMeta : true,
    sassOptions       : {
      sourceMapEmbed: true
    },
    autoprefixer: {
      overrideBrowserslist : targets.browsers,
      enabled              : true,
      cascade              : false,
      sourcemap            : true
    },
    minifyHTML: {
      enabled   : false,
      htmlFiles : ['index.html', '404.html']
    },
    babel: {
      plugins: [
        '@babel/plugin-proposal-object-rest-spread',
        require.resolve('ember-auto-import/babel-plugin')
      ],
      targets,
      sourceMaps: 'inline'
    },
    fingerprint: {
      enabled          : env === 'production',
      generateAssetMap : true,
      exclude          : ['package.json'],
      extensions       : ['js', 'css', 'png', 'jpg', 'gif', 'map', 'svg', 'json']
    },
    sourcemaps: {
      enabled: true
    },
    autoImport: {
      webpack: {
        externals : { jquery: 'jQuery' },
        plugins   : process.env.ANALYE_BUNDLE === 'true' ? [
          new BundleAnalyzerPlugin({
            analyzerMode      : 'static',
            openAnalyzer      : false,
            generateStatsFile : true
          })
        ] : [],
        module: {
          rules: [
            {
              test : /\.css$/i,
              use  : ['style-loader', 'css-loader']
            }
          ]
        }
      }
    }
  });

  app.import('node_modules/semantic-ui-calendar/dist/calendar.min.css');

  app.import('node_modules/semantic-ui-calendar/dist/calendar.min.js', {
    using: [{ transformation: 'fastbootShim' }]
  });
  app.import('node_modules/wysihtml/dist/wysihtml-toolbar.min.js', {
    using: [{ transformation: 'fastbootShim' }]
  });
  app.import('node_modules/tinyColorPicker/jqColorPicker.min.js', {
    using: [{ transformation: 'fastbootShim' }]
  });
  app.import('vendor/jquery-ui.min.js', {
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
