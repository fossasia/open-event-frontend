import Route from '@ember/routing/route';
import moment from 'moment';

export default Route.extend({
  titleToken() {
    return this.l10n.t('Past');
  },
  model() {
    let filterOptions = [];
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
    return this.authManager.currentUser.query('orders', {
      include : 'event',
      filter  : filterOptions
    });
  }
});
