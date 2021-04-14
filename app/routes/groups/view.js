import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class ViewRoute extends Route {

  async model(params) {
    return {
      usersGroupsRoles: await this.store.findRecord('group', params.group_id, {
        include: 'events,roles'
      })
    };
  }
}
