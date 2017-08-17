import Ember from 'ember';
import moment from 'moment';

const { Route } = Ember;

export default Route.extend({
  titleToken() {
    switch (this.get('params.ticket_status')) {
      case 'upcoming':
        return this.l10n.t('Upcoming');
      case 'past':
        return this.l10n.t('Past');
      case 'saved':
        return this.l10n.t('Saved');
    }
  },
  model(params) {
    this.set('params', params);
    let filterOptions = [];
    if (params.ticket_status === 'upcoming') {
      filterOptions = [
        {
          name : 'event',
          op   : 'has',
          val  : {
            name : 'starts-at',
            op   : 'ge',
            val  : moment().toISOString()
          }
        }
      ];
    } else if (params.ticket_status === 'past') {
      filterOptions = [
        {
          name : 'event',
          op   : 'has',
          val  : {
            name : 'ends-at',
            op   : 'lt',
            val  : moment().toISOString()
          }
        }
      ];
    } else {
      filterOptions = [];
    }
    return this.get('authManager.currentUser').query('attendees', {
      include : 'ticket,event,order',
      filter  : filterOptions
    });
  }
});
