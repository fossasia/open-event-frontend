import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  titleToken() {
    return this.l10n.t('Create session');
  },
  model() {
    return this.modelFor('events.view').query('customForms', {
      'page[size]': 50
    });
  }
});
