import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.l10n.t('Revenue');
  },

  async model() {
    let orders = await this.store.findAll('admin-sales-fee', { reload: true }).then(orders => orders.sortBy('name'));
    let events = await this.store.findAll('event', { reload: true }).then(events => events.sortBy('name'));
    orders.forEach((data, index) => data.set('eventDate', events[index].startsAtDate));
    return orders;
  }
});
