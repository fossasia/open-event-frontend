import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import moment from 'moment-timezone';

@classic
export default class ListRoute extends Route.extend(AuthenticatedRouteMixin) {
  titleToken() {
    switch (this.params.tickets_status) {
      case 'upcoming':
        return this.l10n.t('Upcoming');
      case 'past':
        return this.l10n.t('Past');
    }
  }

  async model(params) {
    const userDetails = this.modelFor('admin.users.view');
    this.set('params', params);
    let filterOptions = [];
    if (params.tickets_status === 'upcoming') {
      filterOptions = [
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
            }
          ]
        }
      ];
    } else if (params.tickets_status === 'past') {
      filterOptions = [
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
            }
          ]
        }
      ];
    }
    return {
      orders: await userDetails.query('orders', {
        filter: filterOptions
      })
    };
  }
}
