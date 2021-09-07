import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { hash } from 'rsvp';

@classic
export default class SettingsRoute extends Route.extend(AuthenticatedRouteMixin) {
  titleToken(model) {
    const groupTitle = model.group.name;
    return groupTitle.concat(' - Settings');
  }

  async model(params) {
    return hash({
      group: this.store.findRecord('group', params.group_id, {
        include: 'events,user'
      })
    });
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
