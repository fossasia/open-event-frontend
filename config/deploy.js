/* jshint node: true */

module.exports = function(deployTarget) {
  let ENV = {
    build: {}
    // include other plugin configuration that applies to all deploy targets here
  };

  ENV['revision-data'] = {
    type : 'file-hash',
    scm  : null
  };

  ENV['html-manifest'] = {
    filename     : 'manifest.appcache',
    prependPath  : '/',
    excludePaths : ['index.html', '/assets/moment-locales/', '/assets/locales/', 'assets/moment-locales', 'assets/locales/'],
    includePaths : ['/'],
    network      : ['*'],

    manifestRoot(context) {
      return context.config['html-manifest'].prependPath;
    }
  };

  ENV.pipeline = {
    disabled: {
      git: true
    }
  };

  if (deployTarget === 'development') {
    ENV.build.environment = 'development';
    // configure other plugins for development deploy target here
  }

  if (deployTarget === 'staging') {
    ENV.build.environment = 'production';
    // configure other plugins for staging deploy target here
  }

  if (deployTarget === 'production') {
    ENV.build.environment = 'production';
    // configure other plugins for production deploy target here
  }

  if (deployTarget === 'gh-pages-with-domain' || deployTarget === 'gh-pages') {
    ENV.pipeline = {
      disabled: {}
    };
    ENV.git = {
      repo          : `https://niranjan94:${process.env.GIT_ACCESS_KEY}@github.com/fossasia/open-event-frontend`,
      branch        : 'gh-pages',
      commitMessage : 'Deployed %@'
    };
  }

  if (deployTarget === 'gh-pages') {
    ENV['html-manifest'].prependPath = '/' + (process.env.REPO_SLUG || 'open-event-frontend') + '/';
  }

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};
