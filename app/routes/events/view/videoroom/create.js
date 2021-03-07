import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class CreateRoute extends Route {
  queryParams = {
    room: {
      refreshModel: true
    },
    event: {
      refreshModel: true
    }
  };

  titleToken() {
    return this.l10n.t('Create Video Room');
  }

  async model(params) {
    const eventDetails = this.modelFor('events.view');

    const rooms = await eventDetails.query('microlocations', {
      'page[size]': 0
    });
    const room = params.room ? await this.store.findRecord('microlocation', params.room) : null;
    const event = params.event && !params.room ? eventDetails : null;
    return {
      event    : eventDetails,
      rooms,
      channels : this.store.query('video-channel', {
        'page[size]' : 0,
        public       : true,
        cache        : true
      }),
      stream: await this.store.createRecord('video-stream', {
        name  : room?.name || event?.name,
        rooms : [room].filter(Boolean),
        event
      })
    };
  }

  resetController(controller) {
    super.resetController(...arguments);
    if (!controller.model.stream.id) {
      controller.model.stream.unloadRecord();
    }
  }
}
