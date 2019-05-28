import Route from '@ember/routing/route';

export default Route.extend({
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
  },
  model(params) {
    this.set('params', params);
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
    return this.store.query('session', {
      get_trashed  : true,
      include      : 'event,speakers',
      filter       : filterOptions,
      'page[size]' : 10
    });
  }
});
