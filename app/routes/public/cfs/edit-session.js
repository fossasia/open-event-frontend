import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { hash } from 'rsvp';

@classic
export default class EditSessionRoute extends Route.extend(AuthenticatedRouteMixin) {
  titleToken() {
    return this.l10n.t('Edit Session');
  }

  async model(params) {
    const event = await this.modelFor('public');
    return hash({
      event,
      forms: event.query('customForms', {
        filter: [{
          name : 'form',
          op   : 'eq',
          val  : 'session'
        }],
        sort         : 'id',
        'page[size]' : 0
      }),
      session: this.store.findRecord('session', params.session_id, {
        include: 'session-type,track'
      }),
      tracks       : event.query('tracks', {}),
      sessionTypes : event.query('sessionTypes', {})
    });
  }
}
