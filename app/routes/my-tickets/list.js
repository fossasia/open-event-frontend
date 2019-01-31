import Route from '@ember/routing/route';
import moment from 'moment';

export default Route.extend({
  titleToken() {
    switch (this.get('params.ticket_status')) {
      case 'upcoming':
        return this.get('l10n').t('Upcoming');
      case 'past':
        return this.get('l10n').t('Past');
    }
  },
  model(params) {
    this.set('params', params);
    let filterOptions = [];
    if (params.ticket_status === 'upcoming') {
      filterOptions.push(
        {
          and: [
            {
              name : 'event',
              op   : 'has',
              val  : {
                name : 'starts-at',
                op   : 'ge',
                val  : moment().toISOString()
              }
            },
            {
              or: [
                {
                  name : 'status',
                  op   : 'eq',
                  val  : 'completed'
                },
                {
                  name : 'status',
                  op   : 'eq',
                  val  : 'placed'
                }
              ]
            },
            {
              name : 'event',
              op   : 'has',
              val  : {
                name : 'deleted-at',
                op   : 'eq',
                val  : null
              }
            }
          ]
        }
      );
    } else if (params.ticket_status === 'past') {
      filterOptions.push(
        {
          and: [
            {
              name : 'event',
              op   : 'has',
              val  : {
                name : 'starts-at',
                op   : 'lt',
                val  : moment().toISOString()
              }
            },
            {
              or: [
                {
                  name : 'status',
                  op   : 'eq',
                  val  : 'completed'
                },
                {
                  name : 'status',
                  op   : 'eq',
                  val  : 'placed'
                }
              ]
            },
            {
              name : 'event',
              op   : 'has',
              val  : {
                name : 'deleted-at',
                op   : 'eq',
                val  : null
              }
            }
          ]
        }
      );
    }
    return this.get('authManager.currentUser').query('orders', {
      include : 'event',
      filter  : filterOptions
    });
  }
});
