import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  titleToken() {
    switch (this.get('params.discount_status')) {
      case 'active':
        return this.l10n.t('Active');
      case 'inactive':
        return this.l10n.t('Inactive');
    }
  },
  model(params) {
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
    return this.modelFor('events.view').query('discountCodes', {
      filter       : filterOptions,
      'page[size]' : 10
    });
  }
});
