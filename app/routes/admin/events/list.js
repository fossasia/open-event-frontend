import Route from '@ember/routing/route';
import { action } from '@ember/object';
import EmberTableRouteMixin from 'open-event-frontend/mixins/ember-table-route';
import moment from 'moment';

export default class extends Route.extend(EmberTableRouteMixin) {

  titleToken() {
    switch (this.params.events_status) {
      case 'live':
        return this.l10n.t('Live');
      case 'draft':
        return this.l10n.t('Draft');
      case 'past':
        return this.l10n.t('Past');
      case 'deleted':
        return this.l10n.t('Deleted');
    }
  }


  async model(params) {
    this.set('params', params);
    let filterOptions = [];
    const searchField = 'name';
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

    filterOptions = this.applySearchFilters(filterOptions, params, searchField);
    let queryString = {
      get_trashed    : true,
      include        : 'roles.role,roles.user,general-statistics',
      filter         : filterOptions,
      'page[size]'   : params.per_page || 10,
      'page[number]' : params.page || 1
    };
    queryString = this.applySortFilters(queryString, params);
    return  this.asArray(this.store.query('event', queryString));
  }

  @action
  refreshRoute() {
    this.refresh();
  }
}
