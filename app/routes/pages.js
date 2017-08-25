import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  titleToken() {
    return this.l10n.t('Pages');
  },
  model(params) {
    return this.get('store').findRecord('page', params.page_id);
  }
});
