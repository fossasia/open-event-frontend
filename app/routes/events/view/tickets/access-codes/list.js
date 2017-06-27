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
    this.set('params', params);
    return [
      {
        'accessCode'       : '#386',
        'accessCodeUrl'    : 'https://github.com',
        'accessibleTicket' : 'Early bird',
        'validity'         : '3 months',
        'isActive'         : true
      }, {
        'accessCode'       : '#386',
        'accessCodeUrl'    : 'https://github.com',
        'accessibleTicket' : 'Early bird',
        'validity'         : '3 months',
        'isActive'         : false
      }
    ];
  }
});
