import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import moment from 'moment';

@classic
export default class ListRoute extends Route {
  titleToken() {
    const defaultToken = this.l10n.t('All sessions');
    if (!this.params) {return defaultToken}
    switch (this.params.session_status) {
      case 'all':
        return defaultToken;
      case 'today':
        return this.l10n.t('Today\'s Sessions');
      case 'week':
        return this.l10n.t('Week\'s Sessions');
      case 'month':
        return this.l10n.t('Month\'s Sessions');
    }
  }

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

      const period = params.session_status;
      filterOptions.push({
        and: [
          {
            name : 'starts-at',
            op   : 'ge',
            val  : moment(period).toISOString()
          },
          {
            name : 'starts-at',
            op   : 'le',
            val  : moment(period).add(1, 'days').toISOString()
          }
        ]
      });

    }
    return {
      event   : eventDetails,
      session : await this.infinity.model('session', {
        include      : 'track,speakers,session-type',
        filter       : filterOptions,
        perPage      : 6,
        startingPage : 1,
        perPageParam : 'page[size]',
        pageParam    : 'page[number]'
      })
    };
  }
}
