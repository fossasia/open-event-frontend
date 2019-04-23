import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.get('l10n').t('Activity Logs');
  },

  model() {
    return this.get('store').query('activity', {
      'page[size]' : 100,
      sort         : '-time'
    });
  }
});
