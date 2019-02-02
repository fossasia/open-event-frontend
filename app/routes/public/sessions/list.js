import Route from '@ember/routing/route';
import moment from 'moment';

export default Route.extend({
  titleToken() {
    switch (this.get('params.session_status')) {
      case 'all':
        return this.get('l10n').t('All sessions');
      case 'today':
        return this.get('l10n').t('Today\'s Sessions');
      case 'week':
        return this.get('l10n').t('Week\'s Sessions');
      case 'month':
        return this.get('l10n').t('Month\'s Sessions');
    }
  },
  async model(params) {
    const eventDetails = this.modelFor('public');
    let sessions =  null;
    if (params.session_status === 'today') {
      sessions = await this.get('store').query('session', {
        filter: [
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
                name : 'starts-at',
                op   : 'ge',
                val  : moment().startOf('day').toISOString()
              },
              {
                name : 'starts-at',
                op   : 'lt',
                val  : moment().endOf('day').toISOString()
              },
              {
                name : 'state',
                op   : 'eq',
                val  : 'confirmed'
              }
            ]
          }
        ]
      });
    } else if (params.session_status === 'week') {
      sessions = await this.get('store').query('session', {
        filter: [
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
                name : 'starts-at',
                op   : 'ge',
                val  : moment().startOf('week').toISOString()
              },
              {
                name : 'starts-at',
                op   : 'lt',
                val  : moment().endOf('week').toISOString()
              },
              {
                name : 'state',
                op   : 'eq',
                val  : 'confirmed'
              }
            ]
          }
        ]
      });
    } else if (params.session_status === 'month') {
      sessions = await this.get('store').query('session', {
        filter: [
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
                name : 'starts-at',
                op   : 'ge',
                val  : moment().startOf('month').toISOString()
              },
              {
                name : 'starts-at',
                op   : 'lt',
                val  : moment().add('month').toISOString()
              },
              {
                name : 'state',
                op   : 'eq',
                val  : 'confirmed'
              }
            ]
          }
        ]
      });
    } else {
      sessions = await this.get('store').query('session', {
        filter: [
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
                name : 'state',
                op   : 'eq',
                val  : 'confirmed'
              }
            ]
          }
        ]
      });
    }
    return {
      event   : eventDetails,
      session : sessions
    };
  }
});
