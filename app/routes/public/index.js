import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import moment from 'moment';
import { set } from '@ember/object';
import ENV from 'open-event-frontend/config/environment';
import { allSettled } from 'rsvp';
import { SPEAKERS_FILTER } from './speakers';

@classic
export default class IndexRoute extends Route {
  @service
  headData;

  async model() {
    const event = this.modelFor('public');
    const ticketsPromise = event.query('tickets', {
      filter: [
        {
          and: [
            {
              name : 'sales-starts-at',
              op   : 'le',
              val  : moment().toISOString()
            },
            {
              name : 'sales-ends-at',
              op   : 'ge',
              val  : moment().toISOString()
            }
          ]
        }
      ],
      cache  : true,
      public : true
    });
    const speakersPromise = event.query('speakers', {
      filter: [
        ...SPEAKERS_FILTER
      ],
      sort         : 'order',
      include      : 'sessions.track',
      cache        : true,
      public       : true,
      'page[size]' : 0
    });
    const sponsorsPromise = event.query('sponsors', { 'page[size]': 0, cache: true, public: true });
    const taxPromise = event.get('tax', { cache: true, public: true });

    const [tickets, speakers, sponsors, tax] = (await allSettled([ticketsPromise, speakersPromise, sponsorsPromise, taxPromise]))
      .map(result => result.value);

    return {
      event,
      tickets,
      speakers,

      sponsors,
      tax,
      order: this.store.createRecord('order', {
        event,
        user    : this.authManager.currentUser,
        tickets : []
      }),

      attendees: [],

      mapConfig: ENV.APP.mapConfig
    };
  }

  afterModel(model) {
    set(this, 'headData.description', model.event.description);
  }

  resetController(controller) {
    super.resetController(...arguments);
    const model = controller.model.order;
    if (!model.id) {
      model.unloadRecord();
    }
  }
}
