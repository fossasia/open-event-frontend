/* eslint-env node */

module.exports = function(environment) {
  let ENV = {
    appName                  : process.env.APP_NAME || 'Open Event',
    modulePrefix             : 'open-event-frontend',
    environment,
    rootURL                  : '/',
    locationType             : 'router-scroll',
    historySupportMiddleware : true,
    EmberENV                 : {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      apiHost      : process.env.API_HOST || 'https://open-event-dev.herokuapp.com',
      apiNamespace : process.env.API_NAMESPACE || 'api/v1'
    },

    metricsAdapters: [
      {
        name         : 'GoogleAnalytics',
        environments : ['production'],
        config       : {
          id          : process.env.GOOGLE_ANALYTICS_PROPERTY_ID || 'UA-XXXX-Y',
          debug       : environment === 'development',
          trace       : environment === 'development',
          sendHitTask : environment !== 'development'
        }
      }
    ],

    contentSecurityPolicy: {
      'default-src' : '\'none\'',
      'connect-src' : [
        '\'self\'',
        'ws://eventyay.dev:49153',
        'ws://eventyay.dev:65520',
        'ws://localhost:49153',
        'https://maps.gstatic.com',
        'https://*.eventyay.com',
        'https://eventyay.com',
        'https://open-event-dev.herokuapp.com',
        'https://open-event.herokuapp.com',
        'www.google-analytics.com'
      ],
      'script-src': [
        '\'self\'',
        '\'unsafe-inline\'',
        'https://*.googleapis.com',
        'https://maps.gstatic.com',
        'https://eventyay.com',
        'https://*.eventyay.com',
        'http://eventyay.dev:49153',
        'http://eventyay.dev:65520',
        'http://localhost:49153',
        'www.google-analytics.com',
        'https://platform.twitter.com',
        'https://cdn.syndication.twimg.com'
      ],
      'font-src': [
        '\'self\'',
        'data:',
        'https://fonts.gstatic.com'
      ],
      'img-src': [
        '*',
        'data:'
      ],
      'style-src': [
        '\'self\'',
        '\'unsafe-inline\'',
        'https://fonts.googleapis.com',
        'https://maps.gstatic.com',
        'platform.twitter.com',
        'https://ton.twimg.com'
      ],
      'frame-src' : '*',
      'media-src' : '\'none\''
    },

    moment: {
      includeTimezone: 'subset' /* ,
      localeOutputPath : 'assets/moment-locales'*/
    },

    pace: {
      theme : 'minimal',
      color : 'blue'
    },

    SemanticUI: {
      source: {
        css        : 'bower_components/open-event-theme/dist',
        javascript : 'bower_components/open-event-theme/dist',
        images     : 'bower_components/open-event-theme/dist/themes/default/assets/images',
        fonts      : 'bower_components/open-event-theme/dist/themes/default/assets/fonts'
      }
    }
  };

  ENV['ember-simple-auth'] = {
    authorizer: 'authorizer:jwt'
  };

  ENV['ember-cli-mirage'] = {
    enabled: false
  };

  ENV['ember-simple-auth-token'] = {
    refreshAccessTokens      : false,
    serverTokenEndpoint      : `${ENV.APP.apiHost}/${ENV.APP.apiNamespace}/login`,
    identificationField      : 'email',
    passwordField            : 'password',
    tokenPropertyName        : 'access_token',
    refreshTokenPropertyName : 'refresh_token',
    authorizationPrefix      : 'JWT ',
    authorizationHeaderName  : 'Authorization',
    headers                  : {}
  };

  ENV['g-map'] = {
    libraries : ['places'],
    key       : process.env.GOOGLE_API_KEY,
    protocol  : 'https'
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV['ember-cli-mirage'] = {
      enabled: true
    };
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';

    ENV['simple-auth'] = {
      store: 'simple-auth-session-store:ephemeral'
    };
  }

  if (environment === 'production') {
    if (process.env.DEPLOY_TARGET && process.env.DEPLOY_TARGET === 'gh-pages') {
      ENV.locationType = 'hash';
      ENV.rootURL = `/${  process.env.REPO_SLUG || 'open-event-frontend'}`;
    }
  }

  return ENV;
};
