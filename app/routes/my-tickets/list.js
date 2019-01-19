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
    let filterOptions = [{
      name : 'completed-at',
      op   : 'ne',
      val  : null
    }];
    if (params.ticket_status === 'upcoming') {
      filterOptions.push(
        {
          name : 'event',
          op   : 'has',
          val  : {
            name : 'starts-at',
            op   : 'ge',
            val  : moment().toISOString()
          }
        });
    } else if (params.ticket_status === 'past') {
      filterOptions.push(
        {
          name : 'event',
          op   : 'has',
          val  : {
            name : 'ends-at',
            op   : 'lt',
            val  : moment().toISOString()
          }
        }
      );
    }

    return this.get('authManager.currentUser').query('orders', {
      include : 'event',
      filter  : filterOptions
    });
  }
});
