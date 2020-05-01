/* eslint-env node */
const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const { Webpack } = require('@embroider/webpack');
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
    SemanticUI: {
      source: {
        css        : 'node_modules/@open-event/theme/dist',
        javascript : 'node_modules/@open-event/theme/dist',
        images     : 'node_modules/@open-event/theme/dist/themes/default/assets/images',
        fonts      : 'node_modules/@open-event/theme/dist/themes/default/assets/fonts'
      }
    },
    autoImport: {
      webpack: {
        node: {
          path: true // TODO: Remove after https://github.com/fossasia/open-event-frontend/issues/3956
        },
        externals : { jquery: 'jQuery' },
        plugins   : env === 'production' ? [
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

  return require('@embroider/compat').compatBuild(app, Webpack);
};
