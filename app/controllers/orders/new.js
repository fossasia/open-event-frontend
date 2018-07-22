import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    async save(data) {
      try {
        this.set('isLoading', true);
        let order = data;
        let { attendees } = data;
        for (const attendee of attendees ? attendees.toArray() : []) {
          await attendee.save();
        }
        order.set('status', 'completed');
        await order.save()
          .then(() => {
            this.get('notify').success(this.get('l10n').t('Order details saved. Your order is successful'));
            this.transitionToRoute('orders.view', order.identifier);
          })
          .catch(e => {
            order.set('status', 'pending');
            this.get('notify').error(this.get('l10n').t(` ${e} Oops something went wrong. Please try again`));
          })
          .finally(() => {
            this.set('isLoading', false);
          });
      } catch (e) {
        this.get('notify').error(this.get('l10n').t('Oops something went wrong. Please try again'));
      }
    }
  }
});
