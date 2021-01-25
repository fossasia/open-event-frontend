import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { hash } from 'rsvp';

@classic
export default class EditRoute extends Route.extend(AuthenticatedRouteMixin) {
  titleToken(model) {
    const groupTitle = model.group.name;
    return groupTitle.concat(' - Edit');
  }

  model(params) {
    return hash({
      filteredEvents: this.authManager.currentUser.query('events', {
        include      : 'event-topic,event-sub-topic,event-type,speakers-call',
        'page[size]' : 25
      }),
      group: this.store.findRecord('group', params.group_id, {
        include: 'events'
      })
    });
  }
}
