import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import moment from 'moment';
import { hash } from 'rsvp';

@classic
export default class IndexRoute extends Route {
  async model() {
    const featuredEventsFilter = [
      {
        name : 'is-featured',
        op   : 'eq',
        val  : true
      }
    ];

    const upcomingEventsFilter = [
      {
        or: [
          {
            name : 'is-featured',
            op   : 'eq',
            val  : true
          },
          {
            name : 'is-promoted',
            op   : 'eq',
            val  : true
          },
          {
            and: [
              {
                name : 'logo-url',
                op   : 'ne',
                val  : null
              },
              {
                name : 'original-image-url',
                op   : 'ne',
                val  : null
              },
              {
                name : 'event-topic',
                op   : 'ne',
                val  : null
              },
              {
                name : 'event-sub-topic',
                op   : 'ne',
                val  : null
              },
              {
                name : 'event-type',
                op   : 'ne',
                val  : null
              }
            ]
          }
        ]
      }
    ];

    const callForSpeakersFilter = [
      ...upcomingEventsFilter,
      {
        name : 'is-sessions-speakers-enabled',
        op   : 'eq',
        val  : true
      },
      {
        name : 'speakers-call',
        op   : 'has',
        val  : {
          name : 'privacy',
          op   : 'eq',
          val  : 'public'
        }
      },
      {
        name : 'speakers-call',
        op   : 'has',
        val  : {
          name : 'ends-at',
          op   : 'ge',
          val  : moment().toISOString()
        }
      },
      {
        name : 'speakers-call',
        op   : 'has',
        val  : {
          name : 'announcement',
          op   : 'ne',
          val  : null
        }
      }
    ];

    return hash({
      featuredEvents: this.store.query('event', {
        sort         : 'starts-at',
        include      : 'event-topic,event-sub-topic,event-type,speakers-call',
        filter       : featuredEventsFilter,
        cache        : true,
        public       : true,
        'page[size]' : 6
      }),
      upcomingEvents: this.store.query('event', {
        upcoming     : true,
        include      : 'event-topic,event-sub-topic,event-type,speakers-call',
        filter       : upcomingEventsFilter,
        cache        : true,
        public       : true,
        'page[size]' : 12
      }),
      callForSpeakersEvents: this.store.query('event', {
        sort         : 'starts-at',
        include      : 'event-topic,event-sub-topic,event-type,speakers-call',
        filter       : callForSpeakersFilter,
        cache        : true,
        public       : true,
        'page[size]' : 6
      })
    });
  }

  setupController(controller, model) {
    super.setupController(...arguments);
    controller.set('featuredEvents', model.featuredEvents);
    controller.set('upcomingEvents', model.upcomingEvents);
    controller.set('callForSpeakersEvents', model.callForSpeakersEvents);
    this.set('controller', controller);
  }

}
