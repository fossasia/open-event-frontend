import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

@classic
export default class EditRoute extends Route.extend(AuthenticatedRouteMixin) {
  titleToken(model) {
    const sessionTitle = model.group.name;
    return sessionTitle.concat(' - Edit');
  }

  async model(params) {
    return {
      filteredEvents : this.authManager.currentUser.query('events', {}),
      group          : await this.store.findRecord('group', params.group_id, {
        include: 'events'
      })
    };
  }
}
