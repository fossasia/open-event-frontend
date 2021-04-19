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


    if (this.session.isAuthenticated) {
      const invite = await this.loader.post('/users-groups-roles/accept-invite', payload);
      this.set('redirectionParams',  {
        queryParams: {
          inviteToken : token,
          inviteEmail : invite.email
        }
      });
      return this.transitionTo('groups.list');
    }
  }

  afterModel() {
    if (this.fastboot.isFastBoot) {return}
    this.transitionTo('register', this.redirectionParams);
  }
}
