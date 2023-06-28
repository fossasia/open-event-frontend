import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import moment from 'moment-timezone';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

@classic
export default class ListRoute extends Route.extend(AuthenticatedRouteMixin) {
  titleToken() {
    switch (this.params.session_status) {
      case 'upcoming':
        return this.l10n.t('Upcoming');
      case 'past':
        return this.l10n.t('Past');
    }
  }

  model(params) {
    const userDetails = this.modelFor('admin.users.view');
    this.set('params', params);
    let filterOptions = [];
    if (params.session_status === 'upcoming') {
      filterOptions = [
        {
          and: [
            {
              or: [
                {
                  name : 'starts-at',
                  op   : 'ge',
                  val  : moment().toISOString()
                },
                {
                  and: [
                    {
                      name : 'starts-at',
                      op   : 'eq',
                      val  : null
                    },
                    {
                      name : 'ends-at',
                      op   : 'eq',
                      val  : null
                    }
                  ]
                }
              ]
            },
            {
              name : 'creator',
              op   : 'has',
              val  : {
                name : 'email',
                op   : 'eq',
                val  : userDetails.email
              }
            }
          ]
        }
      ];
    } else {
      filterOptions = [
        {
          and: [
            {
              name : 'ends-at',
              op   : 'lt',
              val  : moment().toISOString()
            },
            {
              name : 'creator',
              op   : 'has',
              val  : {
                name : 'email',
                op   : 'eq',
                val  : userDetails.email
              }
            }
          ]
        }
      ];
    }
    return this.store.query('session', {
      filter : filterOptions,
      sort   : 'starts-at'
    });
  }
}
