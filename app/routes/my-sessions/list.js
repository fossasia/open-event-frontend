import Ember from 'ember';
import moment from 'moment';

const { Route } = Ember;

export default Route.extend({
  titleToken() {
    switch (this.get('params.session_status')) {
      case 'upcoming':
        return this.l10n.t('Upcoming');
      case 'past':
        return this.l10n.t('Past');
    }
  },
  model(params) {
    this.set('params', params);
    let filterOptions = [];
    if (params.session_status === 'upcoming') {
      filterOptions = [
        {
          name : 'starts-at',
          op   : 'ge',
          val  : moment().toISOString()
        }
      ];
    } else {
      filterOptions = [
        {
          name : 'ends-at',
          op   : 'lt',
          val  : moment().toISOString()
        }
      ];
    }
    return this.get('authManager.currentUser').query('sessions', {
      include : 'event',
      filter  : filterOptions,
      sort    : 'starts-at'
    });
  }
});
