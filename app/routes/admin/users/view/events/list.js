import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import moment from 'moment';

export default Route.extend(AuthenticatedRouteMixin, {
  titleToken() {
    switch (this.get('params.event_status')) {
      case 'live':
        return this.l10n.t('Live');
      case 'draft':
        return this.l10n.t('Draft');
      case 'past':
        return this.l10n.t('Past');
    }
  },
  async model(params) {
    this.set('params', params);

    let filterOptions = [];
    if (params.event_status === 'live') {
      filterOptions = [
        {
          name : 'state',
          op   : 'eq',
          val  : 'published'
        },
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
                  op   : 'le',
                  val  : moment().toISOString()
                },
                {
                  name : 'ends-at',
                  op   : 'gt',
                  val  : moment().toISOString()
                }
              ]
            }
          ]
        }
      ];
    } else if (params.event_status === 'past') {
      filterOptions = [
        {
          name : 'ends-at',
          op   : 'lt',
          val  : moment().toISOString()
        },
        {
          name : 'state',
          op   : 'eq',
          val  : 'published'
        }
      ];
    } else {
      filterOptions = [
        {
          name : 'state',
          op   : 'eq',
          val  : 'draft'
        }
      ];
    }

    let queryObject =  {
      include      : 'tickets,sessions,speakers',
      filter       : filterOptions,
      'page[size]' : 10
    };

    const store = this.modelFor('admin.users.view');

    const data = await store.query('events', queryObject);

    return {
      data,
      store,
      query      : queryObject,
      objectType : 'events'
    };

  }
});
