/* eslint-env node */

// https://dummy@getsentry.com/dummy
function getSentryServer(dsn, withProtocol = true) {
  const dsnArray = dsn.split('/');
  dsnArray.pop();
  return `${withProtocol ? `${dsnArray[0]}//` : ''}${dsnArray[2].split('@')[1]}`;
}


module.exports = function(environment) {
  const ENV = {
    appName                  : process.env.APP_NAME || 'Open Event',
    modulePrefix             : 'open-event-frontend',
    environment,
    rootURL                  : process.env.ROOT_URL || '/',
    locationType             : 'router-scroll',
    historySupportMiddleware : true,
    mapboxToken              : process.env.MAPBOX_ACCESS_TOKEN,
    hcaptchaKey              : process.env.HCAPTCHA_SITE_KEY,

    EmberENV: {
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
      apiHost      : process.env.API_HOST || (environment === 'production' ? 'https://api.eventyay.com' : 'https://open-event.dokku.fossasia.org'),
      apiNamespace : process.env.API_NAMESPACE || 'v1',
      version      : process.env.npm_package_version
    },

    moment: {
      includeTimezone  : 'subset',
      localeOutputPath : 'assets/moment-locales'
    },

    pace: {
      theme : 'minimal',
      color : 'blue'
    },

    sentry: {
      dsn              : process.env.SENTRY_DSN || 'https://dummy@getsentry.com/dummy',
      debug            : !!process.env.SENTRY_DSN,
      development      : !process.env.SENTRY_DSN,
      release          : (process.env.SENTRY_PROJECT_NAME || 'eventyay-frontend') + '@' + process.env.npm_package_version,
      tracesSampleRate : process.env.SENTRY_TRACE_SAMPLE_RATE || 0.1
    },

    emberFullCalendar: {
      includeScheduler: true
    },

    noCache: process.env.NO_CACHE || 'false',

    ifa: {
      enabled : false,
      inline  : false
    },

    fastboot: {
      hostWhitelist: [/.+/]
    },

    torii: {},

    webAppGenerator: process.env.WEB_APP_GENERATOR_HOST || (environment === 'production' ? 'https://open-event-wsgen.herokuapp.com' : 'https://open-event-wsgen-dev.herokuapp.com')
  };

  if (environment === 'production') {
    ENV.ifa.enabled = true;
  }

  ENV['ember-simple-auth'] = {
    authorizer: 'authorizer:jwt'
  };

  ENV['ember-h-captcha'] = {
    jsUrl   : 'https://hcaptcha.com/1/api.js', // default
    sitekey : process.env.HCAPTCHA_SITE_KEY,
    hl      : 'en'
  };

  ENV['ember-simple-auth-token'] = {
    tokenDataPropertyName            : 'tokenData', // Key in session to store token data
    refreshAccessTokens              : true,
    serverTokenEndpoint              : `${ENV.APP.apiHost}/auth/session`,
    tokenPropertyName                : 'access_token',
    authorizationPrefix              : 'JWT ',
    authorizationHeaderName          : 'Authorization',
    refreshLeeway                    : 120, // refresh 2 minutes (120 seconds) before expiration
    tokenExpirationInvalidateSession : true, // Enables session invalidation on token expiration
    serverTokenRefreshEndpoint       : `${ENV.APP.apiHost}/v1/auth/token/refresh`, // Server endpoint to send refresh request
    refreshTokenPropertyName         : 'refresh_token', // Key in server response that contains the refresh token
    tokenExpireName                  : 'exp' // Field containing token expiration
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

  if (process.env.GOOGLE_ANALYTICS_PROPERTY_ID) {
    ENV.metricsAdapters = [{
      name         : 'GoogleAnalytics',
      environments : ['production'],
      config       : {
        id          : process.env.GOOGLE_ANALYTICS_PROPERTY_ID || 'UA-XXXX-Y',
        debug       : environment === 'development',
        trace       : environment === 'development',
        sendHitTask : environment !== 'development'
      }
    }];
  }

  return ENV;
};
