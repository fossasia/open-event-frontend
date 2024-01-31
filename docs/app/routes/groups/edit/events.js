import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { hash } from 'rsvp';
import moment from 'moment-timezone';

@classic
export default class EventsRoute extends Route.extend(AuthenticatedRouteMixin) {
  titleToken(model) {
    const groupTitle = model.group.name;
    return groupTitle.concat(' - Events');
  }

  async model(params) {

    const upcomingEventsFilterOptions = [
      {
        and: [
          {
            name : 'deleted-at',
            op   : 'eq',
            val  : null
          },
          {
            name : 'starts-at',
            op   : 'gt',
            val  : moment().toISOString()
          }
        ]
      }
    ];


    const pastEventsFilterOptions = [
      {
        and: [
          {
            name : 'deleted-at',
            op   : 'eq',
            val  : null
          },
          {
            name : 'ends-at',
            op   : 'le',
            val  : moment().toISOString()
          }
        ]
      }
    ];

    const group = await this.store.findRecord('group', params.group_id, {
      include: 'events,user'
    });
    const upcomingEvents = await this.infinity.model('events', {
      filter       : upcomingEventsFilterOptions,
      perPage      : 9,
      startingPage : 1,
      perPageParam : 'page[size]',
      pageParam    : 'page[number]',
      store        : this.authManager.currentUser,
      include      : 'event-topic,event-sub-topic,event-type,speakers-call',
      sort         : '-starts-at'
    });
    const pastEvents = await this.infinity.model('events', {
      filter       : pastEventsFilterOptions,
      perPage      : 9,
      startingPage : 1,
      perPageParam : 'page[size]',
      pageParam    : 'page[number]',
      store        : this.authManager.currentUser,
      include      : 'event-topic,event-sub-topic,event-type,speakers-call',
      sort         : '-starts-at'
    });
    return hash({
      upcomingEvents,
      pastEvents,
      group,
      groupEvents: group.query('events', {})
    });
  }
}
