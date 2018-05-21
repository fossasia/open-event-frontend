import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  titleToken(model) {
    var session_title = model.get('title');
    return this.get('l10n').t(session_title.concat('-Edit'));
  },
  model(params) {
    return this.store.findRecord('session', params.session_id, {
      include: 'session-type,speakers,track'
    });
  }
});
