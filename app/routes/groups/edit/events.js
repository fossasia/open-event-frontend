import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { hash } from 'rsvp';

@classic
export default class EventsRoute extends Route.extend(AuthenticatedRouteMixin) {
  titleToken(model) {
    const groupTitle = model.group.name;
    return groupTitle.concat(' - Events');
  }

  async model(params) {
    const filterOptions = [
      {
        name : 'deleted-at',
        op   : 'eq',
        val  : null
      }
    ];

    const group = await this.store.findRecord('group', params.group_id, {
      include: 'events'
    });

    return hash({
      filteredEvents: this.infinity.model('events', {
        filter       : filterOptions,
        perPage      : 25,
        startingPage : 1,
        perPageParam : 'page[size]',
        pageParam    : 'page[number]',
        store        : this.authManager.currentUser,
        include      : 'event-topic,event-sub-topic,event-type,speakers-call',
        sort         : 'name'
      }),
      group,
      groupEvents: group.query('events', {})
    });
  }
}
