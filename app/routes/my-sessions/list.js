import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import moment from 'moment';
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
    this.set('params', params);
    let filterOptions = [];
    if (params.session_status === 'upcoming') {
      filterOptions = [
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
                },
                {
                  name : 'event',
                  op   : 'has',
                  val  : {
                    name : 'starts-at',
                    op   : 'ge',
                    val  : moment().toISOString()
                  }
                }
              ]
            }
          ]
        }
      ];
    } else if (params.session_status === 'past') {
      filterOptions = [
        {
          name : 'ends-at',
          op   : 'lt',
          val  : moment().toISOString()
        }
      ];
    }

    return this.infinity.model('sessions', {
      include      : 'event',
      filter       : filterOptions,
      sort         : 'starts-at',
      perPage      : 10,
      startingPage : 1,
      perPageParam : 'page[size]',
      pageParam    : 'page[number]',
      store        : this.authManager.currentUser
    });
  }
}
