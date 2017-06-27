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
    return [
      {
        'id'       : 1,
        'code'     : 'ABC',
        'url'      : 'https://eventyay.com/e/9ba7ea20/?code=ABC',
        'value'    : 1,
        'validity' : 'N/A',
        'status'   : 'Active'
      },
      {
        'id'       : 2,
        'code'     : 'FIRST50',
        'url'      : 'https://eventyay.com/e/9ba7ea20/?code=FIRST50',
        'value'    : 3,
        'validity' : 'N/A',
        'status'   : 'Active'
      }
    ];
  }
});
