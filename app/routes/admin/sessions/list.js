import Route from '@ember/routing/route';
import EmberTableRouteMixin from 'open-event-frontend/mixins/ember-table-route';

export default class extends Route.extend(EmberTableRouteMixin) {
  titleToken() {
    switch (this.get('params.sessions_state')) {
      case 'confirmed':
        return this.l10n.t('Confirmed');
      case 'pending':
        return this.l10n.t('Pending');
      case 'accepted':
        return this.l10n.t('Accepted');
      case 'rejected':
        return this.l10n.t('Rejected');
      case 'deleted':
        return this.l10n.t('Deleted');
      default:
        return this.l10n.t('Session');
    }
  }

  async model(params) {
    this.set('params', params);
    const searchField = 'title';
    let filterOptions = [];
    if (params.sessions_state === 'pending') {
      filterOptions = [
        {
          and:
            [
              {
                name : 'event',
                op   : 'has',
                val  : {
                  name : 'deleted-at',
                  op   : 'eq',
                  val  : null
                }
              },
              {
                name : 'deleted-at',
                op   : 'eq',
                val  : null
              },
              {
                name : 'state',
                op   : 'eq',
                val  : 'pending'
              }
            ]
        }
      ];
    } else if (params.sessions_state === 'confirmed') {
      filterOptions = [
        {
          and:
            [
              {
                name : 'event',
                op   : 'has',
                val  : {
                  name : 'deleted-at',
                  op   : 'eq',
                  val  : null
                }
              },
              {
                name : 'deleted-at',
                op   : 'eq',
                val  : null
              },
              {
                name : 'state',
                op   : 'eq',
                val  : 'confirmed'
              }
            ]
        }
      ];
    } else if (params.sessions_state === 'accepted') {
      filterOptions = [
        {
          and:
            [
              {
                name : 'event',
                op   : 'has',
                val  : {
                  name : 'deleted-at',
                  op   : 'eq',
                  val  : null
                }
              },
              {
                name : 'deleted-at',
                op   : 'eq',
                val  : null
              },
              {
                name : 'state',
                op   : 'eq',
                val  : 'accepted'
              }
            ]
        }
      ];
    } else if (params.sessions_state === 'rejected') {
      filterOptions = [
        {
          and:
            [
              {
                name : 'event',
                op   : 'has',
                val  : {
                  name : 'deleted-at',
                  op   : 'eq',
                  val  : null
                }
              },
              {
                name : 'deleted-at',
                op   : 'eq',
                val  : null
              },
              {
                name : 'state',
                op   : 'eq',
                val  : 'rejected'
              }
            ]
        }
      ];
    } else if (params.sessions_state === 'deleted') {
      filterOptions = [
        {
          or:
            [
              {
                name : 'event',
                op   : 'has',
                val  : {
                  name : 'deleted-at',
                  op   : 'ne',
                  val  : null
                }
              },
              {
                name : 'deleted-at',
                op   : 'ne',
                val  : null
              }
            ]
        }
      ];
    } else {
      filterOptions = [
        {
          name : 'event',
          op   : 'has',
          val  : {
            name : 'deleted-at',
            op   : 'eq',
            val  : null
          }
        }
      ];
    }

    filterOptions = this.applySearchFilters(filterOptions, params, searchField);
    let queryString = {
      get_trashed    : true,
      include        : 'event,speakers',
      filter         : filterOptions,
      'page[size]'   : params.per_page || 10,
      'page[number]' : params.page || 1
    };
    queryString = this.applySortFilters(queryString, params);

    return this.asArray(this.store.query('session', queryString));
  }
}
