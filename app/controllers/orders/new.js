import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    async save(data) {
      try {
        this.set('isLoading', true);
        let order = data;
        let current_user = this.get('authManager.currentUser');
        let userChanges = current_user.changedAttributes();
        if (userChanges.firstName || userChanges.lastName) {
          await current_user.save();
        }
        let { attendees, paymentMode } = data;
        for (const attendee of attendees ? attendees.toArray() : []) {
          await attendee.save();
        }
        if (paymentMode === 'free') {
          order.set('status', 'completed');
        } else if (paymentMode === 'bank' || paymentMode === 'cheque' || paymentMode === 'onsite') {
          order.set('status', 'placed');
        } else {
          order.set('status', 'pending');
        }
        await order.save()
          .then(order => {
            if (order.status === 'pending') {
              this.notify.success(this.l10n.t('Order details saved. Please fill the payment details'));
              this.transitionToRoute('orders.pending', order.identifier);
            } else if (order.status === 'completed' || order.status === 'placed') {
              this.notify.success(this.l10n.t('Order details saved. Your order is successful'));
              this.transitionToRoute('orders.view', order.identifier);
            }
          })
          .catch(e => {
            order.set('status', 'initializing');
            this.notify.error(this.l10n.t(` ${e} Oops something went wrong. Please try again`));
          })
          .finally(() => {
            this.set('isLoading', false);
          });
      } catch (e) {
        this.notify.error(this.l10n.t('Oops something went wrong. Please try again'));
      }
    }
  }
});
