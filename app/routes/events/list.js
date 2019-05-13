import Route from '@ember/routing/route';
import moment from 'moment';

export default Route.extend({
  titleToken() {
    switch (this.get('params.event_state')) {
      case 'live':
        return this.get('l10n').t('Live');
      case 'draft':
        return this.get('l10n').t('Draft');
      case 'past':
        return this.get('l10n').t('Past');
    }
  },
  beforeModel(transition) {
    this._super(...arguments);
    const eventState = transition.params[transition.targetName].event_state;
    if (!['live', 'draft', 'past'].includes(eventState)) {
      this.replaceWith('events.view', eventState);
    }
  },
  async model(params) {
    this.set('params', params);
    let filterOptions = [];
    if (params.event_state === 'live') {
      filterOptions = [
        {
          name : 'state',
          op   : 'eq',
          val  : 'published'
        },
        {
          or: [
            {
              name : 'starts-at',
              op   : 'ge',
              val  : moment().toISOString()
            },
            {
              and: [
                {
                  name : 'starts-at',
                  op   : 'le',
                  val  : moment().toISOString()
                },
                {
                  name : 'ends-at',
                  op   : 'gt',
                  val  : moment().toISOString()
                }
              ]
            }
          ]
        }
      ];
    } else if (params.event_state === 'past') {
      filterOptions = [
        {
          name : 'ends-at',
          op   : 'lt',
          val  : moment().toISOString()
        },
        {
          name : 'state',
          op   : 'eq',
          val  : 'published'
        }
      ];
    } else {
      filterOptions = [
        {
          name : 'state',
          op   : 'eq',
          val  : 'draft'
        }
      ];
    }

    let queryObject =  {
      include      : 'tickets,sessions,speakers,organizers,coorganizers,track-organizers,registrars,moderators',
      filter       : filterOptions,
      'page[size]' : 10
    };

    let store = this.get('authManager.currentUser');

    const data = await store.query('events', queryObject);

    return {
      data,
      store,
      query      : queryObject,
      objectType : 'events'
    };

  },
  actions: {
    refreshRoute() {
      this.refresh();
    }
  }
});
