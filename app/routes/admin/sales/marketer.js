import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.l10n.t('Marketer');
  },
  model() {
    return [{
      marketers : 'Sample Marketer1',
      tickets   : 100,
      sales     : 50.00,
      discounts : 500.00
    }, {
      marketers : 'Sample Marketer2',
      tickets   : 500,
      sales     : 1000.00,
      discounts : 200.00
    }];
  }
});
