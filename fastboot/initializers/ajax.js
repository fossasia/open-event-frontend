export default {
  name: 'ajax-service',
  initialize() {
    // noop
    // This is to override Fastboot's initializer which prevents ember-fetch from working
    // https://github.com/ember-fastboot/ember-cli-fastboot/blob/master/packages/ember-cli-fastboot/fastboot/initializers/ajax.js
  }
};
