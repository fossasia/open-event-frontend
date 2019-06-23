import Route from '@ember/routing/route';
import moment from 'moment';

export default Route.extend({
  queryParams: {
    currentPage: {
      refreshModel: true
    }
  },
  titleToken() {
    switch (this.get('params.event_state')) {
      case 'live':
        return this.l10n.t('Live');
      case 'draft':
        return this.l10n.t('Draft');
      case 'past':
        return this.l10n.t('Past');
    }
  },
  beforeModel(transition) {
    this._super(...arguments);
    const eventState = transition.to.params.event_state;
    if (!['live', 'draft', 'past'].includes(eventState)) {
      this.replaceWith('events.view', eventState);
    }
  },
  async model(params) {
    console.log(params);
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
      include        : 'tickets,sessions,speakers,owners,organizers,coorganizers,track-organizers,registrars,moderators',
      filter         : filterOptions,
      'page[size]'   : 2,
      'page[number]' : this.params.currentPage || 1
    };

    let store = this.get('authManager.currentUser');

    const data = await store.query('events', queryObject);

    return {
      data,
      store,
      query      : queryObject,
      objectType : 'events',
      meta: data.meta
    };

  },
  actions: {
    refreshRoute() {
      this.refresh();
    }
  }
});
