import Route from '@ember/routing/route';
import moment from 'moment';

export default Route.extend({
  titleToken() {
    switch (this.get('params.access_status')) {
      case 'active':
        return this.l10n.t('Active');
      case 'inactive':
        return this.l10n.t('Inactive');
      case 'expired':
        return this.l10n.t('Expired');
    }
  },
  async model(params) {
    let filterOptions = [];
    if (params.access_status === 'active') {
      filterOptions = [
        {
          and: [
            {
              name : 'valid_till',
              op   : 'ge',
              val  : moment().toISOString()
            },
            {
              name : 'is-active',
              op   : 'eq',
              val  : true
            }
          ]
        }
      ];
    } else if (params.access_status === 'inactive') {
      filterOptions = [
        {
          and: [
            {
              name : 'valid_till',
              op   : 'ge',
              val  : moment().toISOString()
            },
            {
              name : 'is-active',
              op   : 'eq',
              val  : false
            }
          ]
        }
      ];
    } else if (params.discount_status === 'expired') {
      filterOptions = [
        {
          name : 'valid_till',
          op   : 'lt',
          val  : moment().toISOString()
        }
      ];
    } else {
      filterOptions = [];
    }

    let queryObject = {
      filter       : filterOptions,
      'page[size]' : 10
    };

    let store = this.modelFor('events.view');

    let data = await store.query('accessCodes', queryObject);

    return {
      data,
      store,
      query      : queryObject,
      objectType : 'accessCodes'
    };
  },

  actions: {
    refreshRoute() {
      this.refresh();
    }
  }
});
