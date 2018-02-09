import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  titleToken() {
    switch (this.get('params.access_status')) {
      case 'active':
        return this.l10n.t('Active');
      case 'inactive':
        return this.l10n.t('Inactive');
    }
  },
  model(params) {
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
    return this.modelFor('events.view').query('accessCodes', {
      filter       : filterOptions,
      'page[size]' : 10
    });
  }
});
