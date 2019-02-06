import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    switch (this.get('params.access_status')) {
      case 'active':
        return this.get('l10n').t('Active');
      case 'inactive':
        return this.get('l10n').t('Inactive');
    }
  },
  async model(params) {
    let filterOptions = [];
    if (params.access_status === 'active') {
      filterOptions = [
        {
          name : 'is-active',
          op   : 'eq',
          val  : true
        }
      ];
    } else if (params.access_status === 'inactive') {
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
