import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  titleToken() {
    return this.l10n.t('Microservices');
  },
  actions: {
    willTransition() {
      this.get('controller.model').rollbackAttributes();
    }
  }
});
