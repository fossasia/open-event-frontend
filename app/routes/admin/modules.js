import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  titleToken() {
    return this.i18n.t('Modules');
  },
  model() {
    return {
      ticketing : false,
      payments  : false,
      donations : false
    };
  }
});
