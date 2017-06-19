import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  titleToken() {
    return this.i18n.t('Fees');
  },

  model() {
    return [{
      event   : 'Sample Event',
      tickets : 1,
      fee     : 20,
      revenue : 25
    }, {
      event   : 'Sample Event2',
      tickets : 3,
      fee     : 10,
      revenue : 40
    }];
  }
});
