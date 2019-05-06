import Route from '@ember/routing/route';
import moment from 'moment';

export default Route.extend({
  titleToken() {
    switch (this.get('params.discount_status')) {
      case 'active':
        return this.get('l10n').t('Active');
      case 'inactive':
        return this.get('l10n').t('Inactive');
      case 'expired':
        return this.get('l10n').t('Expired');
    }
  },
  async model(params) {
    this.set('params', params);
    let filterOptions = [];
    if (params.discount_status === 'active') {
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
    } else if (params.discount_status === 'inactive') {
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

    let data = await store.query('discountCodes', queryObject);

    return {
      data,
      store,
      query      : queryObject,
      objectType : 'discountCodes'
    };
  },

  actions: {
    refreshRoute() {
      this.refresh();
    }
  }
});
