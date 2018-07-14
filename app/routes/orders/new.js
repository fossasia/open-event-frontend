import Route from '@ember/routing/route';

export default Route.extend({
  titleToken(model) {
    var order = model.get('identifier');
    return this.get('l10n').t(`New Order -${order}`);
  },

  model(params) {
    return this.store.findRecord('order', params.order_id, {
      include: 'attendees,tickets,event'
    });
  }
});
