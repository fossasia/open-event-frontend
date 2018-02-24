import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  titleToken() {
    return this.l10n.t('Sessions');
  },
  model(params) {
    return this.store.findRecord('session', params.session_id, {
      include: 'session-type,speakers,track'
    });
  }
});
