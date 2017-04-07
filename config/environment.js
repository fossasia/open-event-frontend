/* eslint-env node */

module.exports = function(environment) {
  var ENV = {
    appName      : 'Open Event',
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
      // Here you can pass flags/options to your application instance
      // when it is created
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

  if (environment === 'production') {
    if (ENV.deployTarget && ENV.deployTarget === 'gh-pages') {
      ENV.locationType = 'hash';
      ENV.rootURL = '/open-event-frontend';
    }
  }

  return ENV;
};
