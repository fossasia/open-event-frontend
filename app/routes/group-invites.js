import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

@classic
export default class GruopInvitesRoute extends Route {
  @service
  fastboot;

  redirectionParams = null;

  async beforeModel(transition) {
    // We don't want to process or transition in fastboot mode
    // Since this is only an intermediate page
    if (this.fastboot.isFastBoot) {return}
    const { token } = transition.to.queryParams;
    const payload = {
      data: { token }
    };

    const invite = await this.loader.post('/users-groups-roles/accept-invite', payload);
    if (this.session.isAuthenticated) {
      return this.transitionTo('groups.list');
    }
    this.set('redirectionParams',  {
      queryParams: {
        inviteToken : token,
        inviteEmail : invite.email
      }
    });

  }

  afterModel() {
    if (this.fastboot.isFastBoot) {return}
    this.transitionTo('register', this.redirectionParams);
  }
}
