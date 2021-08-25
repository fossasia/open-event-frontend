import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

@classic
export default class TeamRoute extends Route.extend(AuthenticatedRouteMixin) {

  async model(params) {
    // How to query role-invites here. And roles to be include with group
    const group = await this.store.findRecord('group', params.group_id, {
      include: 'events,roles,user'
    });
    return {
      group,
      roles: await this.store.findAll('role')
    };
  }

  afterModel(model) {
    function isUserOwnerOrOrganizer(roles, userEmail, ownerEmail) {
      if (userEmail === ownerEmail) {return true} else {
        return roles.toArray().some(role => {
          if (userEmail === role.email && role.accepted) {return true}
        });
      }
    }
    if (!isUserOwnerOrOrganizer(model.group.roles, this.authManager.currentUser.email, model.group.user.get('email')) && !this.authManager.currentUser.isAdmin) {
      this.transitionTo('index');
    }
  }
}
