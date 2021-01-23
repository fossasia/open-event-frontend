import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

@classic
export default class EditRoute extends Route.extend(AuthenticatedRouteMixin) {
  titleToken(model) {
    const groupTitle = model.group.name;
    return groupTitle.concat(' - Edit');
  }

  async model(params) {
    return {
      filteredEvents: await this.authManager.currentUser.query('events', {
        include      : 'event-topic,event-sub-topic,event-type,speakers-call',
        'page[size]' : 25
      }),
      group: await this.store.findRecord('group', params.group_id, {
        include: 'events'
      })
    };
  }
}
