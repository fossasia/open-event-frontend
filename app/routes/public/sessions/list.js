import Route from '@ember/routing/route';
import moment from 'moment';

export default Route.extend({
  titleToken() {
    switch (this.get('params.session_status')) {
      case 'all':
        return this.l10n.t('All sessions');
      case 'today':
        return this.l10n.t('Today\'s Sessions');
      case 'week':
        return this.l10n.t('Week\'s Sessions');
      case 'month':
        return this.l10n.t('Month\'s Sessions');
    }
  },
  async model(params) {
    const eventDetails = this.modelFor('public');
    const filterOptions = [
      {
        and: [
          {
            name : 'event',
            op   : 'has',
            val  : {
              name : 'identifier',
              op   : 'eq',
              val  : eventDetails.id
            }
          },
          {
            or: [
              {
                name : 'state',
                op   : 'eq',
                val  : 'confirmed'
              },
              {
                name : 'state',
                op   : 'eq',
                val  : 'accepted'
              }
            ]
          }
        ]
      }
    ];

    if (params.session_status !== 'all') {

      const period = params.session_status === 'today' ? 'day' : params.session_status;
      filterOptions.push({
        and: [
          {
            name : 'starts-at',
            op   : 'ge',
            val  : moment().startOf(period).toISOString()
          },
          {
            name : 'starts-at',
            op   : 'lt',
            val  : moment().endOf(period).toISOString()
          }
        ]
      });

    }
    return {
      event   : eventDetails,
      session : await this.infinity.model('session', {
        filter       : filterOptions,
        perPage      : 6,
        startingPage : 1,
        perPageParam : 'page[size]',
        pageParam    : 'page[number]'
      })
    };
  }
});
