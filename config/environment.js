/* eslint-env node */

module.exports = function(environment) {
  var ENV = {
    appName      : process.env.APP_NAME || 'Open Event',
    modulePrefix : 'open-event-frontend',
    environment,
    rootURL      : '/',
    locationType : 'auto',
    EmberENV     : {
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

    contentSecurityPolicy: {
      'connect-src' : '*',
      'script-src'  : '* \'unsafe-inline\'',
      'default-src' : '\'none\'',
      'font-src'    : '\'self\' data: https://fonts.gstatic.com',
      'img-src'     : '* data:',
      'style-src'   : '\'self\' \'unsafe-inline\' https://fonts.googleapis.com',
      'frame-src'   : '*',
      'media-src'   : '\'none\''
    }
  };

  ENV['ember-simple-auth'] = {
    authorizer: 'authorizer:jwt'
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

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  var deployTarget = process.env.DEPLOY_TARGET;

  if (environment === 'production') {
    if (deployTarget && deployTarget === 'gh-pages') {
      ENV.locationType = 'hash';
      ENV.rootURL = '/' + (process.env.REPO_SLUG || 'open-event-frontend');
    }
  }

  return ENV;
};
