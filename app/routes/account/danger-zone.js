import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import moment from 'moment';

@classic
export default class DangerZoneRoute extends Route.extend(AuthenticatedRouteMixin) {
  titleToken() {
    return this.l10n.t('Danger Zone');
  }

  async model() {
    const user = this.authManager.currentUser;

    const filter = [{
      and: [
        {
          or: ['completed', 'placed', 'pending', 'initializing'].map(val => ({
            name : 'status',
            op   : 'eq',
            val
          }))
        },
        {
          name : 'event',
          op   : 'has',
          val  : {
            name : 'ends-at',
            op   : 'ge',
            val  : moment()
          }
        }]
    }];

    const events = await user.query('events', {});
    const orders = await user.query('orders', { filter });

    return {
      user,
      events,
      orders
    };
  }
}
