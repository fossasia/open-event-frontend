import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  titleToken() {
    return this.l10n.t('System Roles');
  },
  model() {
    return this.get('store').findAll('user-permission');
  },
  actions: {
    willTransition() {
      this.get('controller.model').forEach(userPermission => {
        userPermission.rollbackAttributes();
      });
    }
  }
});
