import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class TeamRoute extends Route {

  async model(params) {
    // How to query role-invites here. And roles to be include with group
    const group = await this.store.findRecord('group', params.group_id, {
      include: 'events,roles'
    });
    return {
      group,
      roles: await this.store.findAll('role')
    };
  }
}
