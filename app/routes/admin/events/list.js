import Route from '@ember/routing/route';
import moment from 'moment';

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
          and: [
            {
              name : 'deleted-at',
              op   : 'eq',
              val  : null
            },
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
          ]
        }
      ];
    } else if (params.events_status === 'past') {
      filterOptions = [
        {
          and: [
            {
              name : 'deleted-at',
              op   : 'eq',
              val  : null
            },
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
          ]
        }
      ];
    } else if (params.events_status === 'draft') {
      filterOptions = [
        {
          and:
            [
              {
                name : 'deleted-at',
                op   : 'eq',
                val  : null
              },
              {
                name : 'state',
                op   : 'eq',
                val  : 'draft'
              }
            ]

        }
      ];
    } else if (params.events_status === 'deleted') {
      filterOptions = [
        {
          name : 'deleted-at',
          op   : 'ne',
          val  : null
        }
      ];
    } else {
      filterOptions = [];
    }

    return this.store.query('event', {
      get_trashed  : true,
      include      : 'tickets,sessions,speakers,organizers,coorganizers,track-organizers,registrars,moderators',
      filter       : filterOptions,
      'page[size]' : 10
    });
  },

  actions: {
    refreshRoute() {
      this.refresh();
    }
  }
});
