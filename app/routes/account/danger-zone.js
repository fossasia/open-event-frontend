import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

@classic
export default class DangerZoneRoute extends Route.extend(AuthenticatedRouteMixin) {
  titleToken() {
    return this.l10n.t('Danger Zone');
  }

  async model() {
    const user = this.authManager.currentUser;

    const filter = [{
      or: ['completed', 'placed', 'pending', 'initializing'].map(val => ({
        name : 'status',
        op   : 'eq',
        val
      }))
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
