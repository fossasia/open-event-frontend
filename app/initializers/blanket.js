import FragmentSerializer from '../serializers/fragment';

export function initialize(application) {

  application.register('serializer:-fragment', FragmentSerializer);

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
  inject('i18n', 'service:l10n');
  inject('device', 'service:device');
  inject('notify', 'service:notify');
  inject('confirm', 'service:confirm');
  inject('sanitizer', 'service:sanitizer');

  application.inject('component', 'routing', 'service:-routing');

}

export default {
  name: 'blanket',
  initialize
};
