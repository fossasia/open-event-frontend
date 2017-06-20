import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  titleToken() {
    return this.l10n.t('Status');
  },
  model() {
    return [{
      invoice : 'Sample Invoice 1',
      event   : 'Sample Event 1',
      date    : new Date(),
      amount  : 1000.0,
      sentTo  : 'testuser1@gmail.com',
      status  : 'Delivered'
    }, {
      invoice : 'Sample Invoice 2',
      event   : 'Sample Event 2',
      date    : new Date(),
      amount  : 100000.0,
      sentTo  : 'testuser2@gmail.com',
      status  : 'Pending'
    }];
  }
});
