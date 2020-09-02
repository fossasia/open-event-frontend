import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

@classic
export default class ViewRoute extends Route.extend(AuthenticatedRouteMixin) {
  titleToken() {
    return this.l10n.t('Sessions');
  }

  model(params) {
    return this.store.findRecord('session', params.session_id, {
      include: 'session-type,speakers,track,event'
    });
  }
}
