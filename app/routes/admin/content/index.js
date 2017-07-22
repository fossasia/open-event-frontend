import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  titleToken() {
    return this.l10n.t('Social Links');
  },
  model() {
    return this.get('store').queryRecord('setting', {});
  }
});
