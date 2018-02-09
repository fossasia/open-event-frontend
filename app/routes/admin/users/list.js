import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  titleToken() {
    switch (this.get('params.users_status')) {
      case 'active':
        return this.l10n.t('Active');
      case 'deleted':
        return this.l10n.t('Deleted');
    }
  },
  model(params) {
    this.set('params', params);
    return this.get('store').query('user', {
      'page[size]': 10
    });
  }
});
