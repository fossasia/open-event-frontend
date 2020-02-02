/* eslint-env node */

// https://dummy@getsentry.com/dummy
function getSentryServer(dsn, withProtocol = true) {
  const dsnArray = dsn.split('/');
  dsnArray.pop();
  return `${withProtocol ? `${dsnArray[0]}//` : ''}${dsnArray[2].split('@')[1]}`;
}


module.exports = function(environment) {
  let ENV = {
    appName                  : process.env.APP_NAME || 'Open Event',
    modulePrefix             : 'open-event-frontend',
    environment,
    rootURL                  : process.env.ROOT_URL || '/',
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
      apiHost      : process.env.API_HOST || 'https://open-event-api-dev.herokuapp.com',
      apiNamespace : process.env.API_NAMESPACE || 'v1'
    },

    metricsAdapters: [{
      name         : 'GoogleAnalytics',
      environments : ['production'],
      config       : {
        id          : process.env.GOOGLE_ANALYTICS_PROPERTY_ID || 'UA-XXXX-Y',
        debug       : environment === 'development',
        trace       : environment === 'development',
        sendHitTask : environment !== 'development'
      }
    }],

    moment: {
      includeTimezone: 'subset'
      /* ,
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
    },

    sentry: {
      dsn         : process.env.SENTRY_DSN || 'https://dummy@getsentry.com/dummy',
      debug       : !!process.env.SENTRY_DSN,
      development : !process.env.SENTRY_DSN
    },

    emberFullCalendar: {
      includeScheduler: true
    },

    ifa: {
      enabled : false,
      inline  : false
    },

    fastboot: {
      hostWhitelist: [/.+/]
    },

    torii: {}
  };

  if (environment === 'production') {
    ENV.ifa.enabled = true;
  }

  ENV['ember-simple-auth'] = {
    authorizer: 'authorizer:jwt'
  };

  ENV['ember-cli-mirage'] = {
    enabled: false
  };

  ENV['ember-simple-auth-token'] = {
    refreshAccessTokens : false,
    serverTokenEndpoint : `${ENV.APP.apiHost}/auth/session`,
    tokenPropertyName : 'access_token',
    authorizationPrefix : 'JWT ',
    authorizationHeaderName: 'Authorization'
  };

  ENV['g-map'] = {
    libraries : ['places'],
    key       : process.env.GOOGLE_API_KEY,
    protocol  : 'https'
  };

  ENV.APP.mapConfig = {};

  // Use embed iframe map using address if MAP_DISPLAY is set or GOOGLE_API_KEY is not available or invalid
  if (process.env.MAP_DISPLAY === 'embed' || !process.env.GOOGLE_API_KEY || !process.env.GOOGLE_API_KEY.startsWith('AIza')) {
    ENV.APP.mapConfig.display = 'embed';
  }

  ENV.sentry.hostname = getSentryServer(ENV.sentry.dsn, false);
  ENV.sentry.server = getSentryServer(ENV.sentry.dsn, true);
  if (process.env.CSPPermissive) {
    ENV.contentSecurityPolicy = { 'default-src': ['*', '', 'data:', 'blob:', '\'unsafe-inline\'', '\'unsafe-eval\''], 'script-src': ['*', '\'unsafe-inline\'', '\'unsafe-eval\''], 'connect-src': ['*', '\'unsafe-inline\''], 'img-src': ['*', 'data:', 'blob:', '\'unsafe-inline\''], 'frame-src': ['*'], 'style-src': ['*', 'data:', 'blob:', '\'unsafe-inline\''], 'font-src': ['*', 'data:', 'blob:', '\'unsafe-inline\''] };
  } else {
    ENV.contentSecurityPolicy = {
      'default-src' : '\'none\'',
      'connect-src' : [
        '\'self\'',
        'ws://eventyay.local:65520',
        'ws://localhost:49153',
        'https://maps.gstatic.com',
        'https://*.eventyay.com',
        'https://eventyay.com',
        'https://open-event-api-dev.herokuapp.com',
        'www.google-analytics.com',
        'http://127.0.0.1:5000',
        ENV.sentry.hostname
      ],
      'script-src': [
        '\'self\'',
        '\'unsafe-inline\'',
        'https://*.googleapis.com',
        'https://maps.gstatic.com',
        'https://eventyay.com',
        'https://*.eventyay.com',
        'http://eventyay.local:65520',
        'http://localhost:49153',
        'www.google-analytics.com',
        'https://platform.twitter.com',
        'https://cdn.syndication.twimg.com',
        'http://127.0.0.1:5000',
        'cdn.omise.co/omise.js',
        'cdn.ravenjs.com'
      ],
      'font-src': [
        '\'self\'',
        'data:',
        'https://fonts.gstatic.com'
      ],
      'img-src': [
        '*',
        'data:',
        'app.getsentry.com',
        ENV.sentry.hostname
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
    };
  }
  
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
    ENV.APP.autoboot = false;

    ENV['simple-auth'] = {
      store: 'simple-auth-session-store:ephemeral'
    };

    ENV['ember-simple-auth-token'].tokenExpirationInvalidateSession = false;
  }

  if (environment === 'production') {
    if (process.env.DEPLOY_TARGET && process.env.DEPLOY_TARGET === 'gh-pages') {
      ENV.locationType = 'hash';
      ENV.rootURL = `/${process.env.REPO_SLUG || 'open-event-frontend'}`;
    }
  }

  return ENV;
};
