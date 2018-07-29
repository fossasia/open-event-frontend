import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.get('l10n').t('Messages');
  },
  model() {
    return this.get('store').query('message-setting', {});
  }
});
