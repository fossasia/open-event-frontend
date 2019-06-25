export function initialize(application) {

  const inject = (property, what) => {
    application.inject('controller', property, what);
    application.inject('component', property, what);
    application.inject('route', property, what);
  };

  inject('config', 'service:config');
  inject('session', 'service:session');
  inject('authManager', 'service:auth-manager');
  inject('store', 'service:store');
  inject('metrics', 'service:metrics');
  inject('loader', 'service:loader');
  inject('l10n', 'service:l10n');
  inject('device', 'service:device');
  inject('notify', 'service:notify');
  inject('confirm', 'service:confirm');
  inject('sanitizer', 'service:sanitizer');
  inject('settings', 'service:settings');
  inject('fastboot', 'service:fastboot');
  inject('routing', 'service:-routing');
  inject('cookies', 'service:cookies');
  inject('infinity', 'service:infinity');
  inject('headData', 'service:headData');
  application.inject('component', 'router', 'service:router');
}

export default {
  name: 'blanket',
  initialize
};
