import Ember from 'ember';
import moment from 'moment';

const { Route } = Ember;

export default Route.extend({
  titleToken() {
    switch (this.get('params.events_status')) {
      case 'live':
        return this.l10n.t('Live');
      case 'draft':
        return this.l10n.t('Draft');
      case 'past':
        return this.l10n.t('Past');
      case 'deleted':
        return this.l10n.t('Deleted');
    }
  },
  model(params) {
    this.set('params', params);
    let filterOptions = [];
    if (params.events_status === 'live') {
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
    } else if (params.events_status === 'past') {
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
    } else if (params.events_status === 'draft') {
      filterOptions = [
        {
          name : 'state',
          op   : 'eq',
          val  : 'draft'
        }
      ];
    } else if (params.events_status === 'deleted') {
      filterOptions = [
        {
          name : 'state',
          op   : 'eq',
          val  : 'deleted'
        }
      ];
    } else {
      filterOptions = [];
    }

    return this.store.query('event', {
      include      : 'tickets,sessions,speakers,organizers,coorganizers,track-organizers,registrars,moderators',
      filter       : filterOptions,
      'page[size]' : 10
    });
  }
});
