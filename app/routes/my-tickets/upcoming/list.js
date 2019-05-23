import Route from '@ember/routing/route';
import moment from 'moment';

export default Route.extend({
  titleToken() {
    switch (this.get('params.ticket_status')) {
      case 'completed':
        return this.l10n.t('Completed');
      case 'open':
        return this.l10n.t('Open');
    }
  },
  model(params) {
    this.set('params', params);
    let filterOptions = [];
    if (params.ticket_status === 'completed') {
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
              name : 'status',
              op   : 'eq',
              val  : 'completed'
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
    } else if (params.ticket_status === 'open') {
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
              name : 'status',
              op   : 'eq',
              val  : 'placed'
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
    return this.authManager.currentUser.query('orders', {
      include : 'event',
      filter  : filterOptions
    });
  }
});
