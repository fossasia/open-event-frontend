import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    switch (this.get('params.discount_status')) {
      case 'active':
        return this.get('l10n').t('Active');
      case 'inactive':
        return this.get('l10n').t('Inactive');
    }
  },
  async model(params) {
    this.set('params', params);
    let filterOptions = [];
    if (params.discount_status === 'active') {
      filterOptions = [
        {
          name : 'is-active',
          op   : 'eq',
          val  : true
        }
      ];
    } else if (params.discount_status === 'inactive') {
      filterOptions = [
        {
          name : 'is-active',
          op   : 'eq',
          val  : false
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
  }
});
