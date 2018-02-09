import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  titleToken() {
    return this.l10n.t('Settings');
  },
  model() {
    return this.get('store').queryRecord('setting', {});
  }
});
