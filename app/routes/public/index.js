import Route from '@ember/routing/route';
import moment from 'moment';
import { set } from '@ember/object';
import { inject as service } from '@ember/service';

export default Route.extend({
  headData: service(),
  async model() {
    const eventDetails = this.modelFor('public');
    return {
      event   : eventDetails,
      tickets : await eventDetails.query('tickets', {
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
      }),
      speakers: await eventDetails.query('speakers', {
        filter: [
          {
            or: [
              {
                name : 'sessions',
                op   : 'any',
                val  : {
                  name : 'state',
                  op   : 'eq',
                  val  : 'confirmed'
                }
              },
              {
                name : 'sessions',
                op   : 'any',
                val  : {
                  name : 'state',
                  op   : 'eq',
                  val  : 'accepted'
                }
              }
            ]
          }
        ],
        'page[size]': 0
      }),

      sponsors: await eventDetails.get('sponsors'),

      order: this.store.createRecord('order', {
        event   : eventDetails,
        user    : this.get('authManager.currentUser'),
        tickets : []
      }),

      attendees: []
    };
  },
  afterModel(model) {
    set(this, 'headData.description', model.event.description);
  },
  resetController(controller) {
    this._super(...arguments);
    const model = controller.get('model.order');
    if (!model.id) {
      model.unloadRecord();
    }
  }
});
