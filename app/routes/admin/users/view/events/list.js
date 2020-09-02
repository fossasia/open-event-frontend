import Route from '@ember/routing/route';
import moment from 'moment';
import EmberTableRouteMixin from 'open-event-frontend/mixins/ember-table-route';

export default class extends Route.extend(EmberTableRouteMixin) {

  async model(params) {
    let filterOptions = [];
    const searchField = 'name';
    if (params.event_status === 'live') {
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
    } else if (params.event_status === 'past') {
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
    } else if (params.event_status === 'draft') {
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
    } else if (params.event_status === 'deleted') {
      filterOptions = [
        {
          name : 'deleted-at',
          op   : 'ne',
          val  : null
        }
      ];
    }
    filterOptions = this.applySearchFilters(filterOptions, params, searchField);
    let queryString = {
      get_trashed    : true,
      filter         : filterOptions,
      'page[size]'   : params.per_page || 10,
      'page[number]' : params.page || 1
    };
    queryString = this.applySortFilters(queryString, params);
    return this.asArray(this.modelFor('admin.users.view').query('events', queryString));
  }
}
