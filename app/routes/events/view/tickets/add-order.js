import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  titleToken() {
    return this.i18n.t('Add Order');
  },
  model() {
    return [{
      _id        : 1,
      ticketType : 'Free',
      price      : 10,
      quantity   : 0,
      itemTotal  : 0
    },
    {
      _id        : 2,
      ticketType : 'Paid',
      price      : 10,
      quantity   : 0,
      itemTotal  : 0
    }];
  }
});
