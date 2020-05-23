import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import moment from 'moment';
import { set } from '@ember/object';
import ENV from 'open-event-frontend/config/environment';

@classic
export default class IndexRoute extends Route {
  @service
  headData;

  async model() {
    const event = this.modelFor('public');
    const ticketsPromise = event.query('tickets', {
      reload: true,

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
      ]
    });
    const featuredSpeakersPromise = event.query('speakers', {
      filter: [
        {
          name : 'is-featured',
          op   : 'eq',
          val  : 'true'
        }
      ],
      'page[size]': 0
    });
    const sponsorsPromise = event.get('sponsors');
    const taxPromise = event.get('tax');

    const [tickets, featuredSpeakers, sponsors, tax] = await Promise.all([ticketsPromise, featuredSpeakersPromise, sponsorsPromise, taxPromise]);

    return {
      event,
      tickets,
      featuredSpeakers,

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
