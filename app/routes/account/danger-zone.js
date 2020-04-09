import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

@classic
export default class DangerZoneRoute extends Route.extend(AuthenticatedRouteMixin) {
  titleToken() {
    return this.l10n.t('Danger Zone');
  }

  async model() {

    let user = this.authManager.currentUser;
    const events = await user.query('events', {});
    const orders = await user.query('orders', {});

    return {
      user,
      events,
      orders
    };
  }
}
