import Route from '@ember/routing/route';
import moment from 'moment';

export default Route.extend({
  titleToken() {
    return this.get('l10n').t('Create');
  },
  model() {
    return this.get('store').createRecord('access-code', {
      event         : this.modelFor('events.view'),
      tickets       : [],
      marketer      : this.get('authManager.currentUser'),
      validFromDate : moment(),
      validFromTime : '12:00',
      validTillDate : moment().add(7, 'days'),
      validTillTime : '16:00',
      minQuantity   : 1,
      maxQuantity   : 1
    });
  },
  resetController(controller) {
    this._super(...arguments);
    const model = controller.get('model');
    if (!model.id) {
      model.unloadRecord();
    }
  }
});
