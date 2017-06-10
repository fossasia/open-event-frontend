import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  titleToken() {
    return this.i18n.t('Upcoming');
  },
  model() {
    return this.modelFor('my-tickets');
  }
});
