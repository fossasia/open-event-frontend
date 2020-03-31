import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    saveCode(discountCode) {
      discountCode.save()
        .then(() => {
          this.notify.success(this.l10n.t('Discount code has been successfully updated.'));
          this.transitionToRoute('events.view.tickets.discount-codes');
        })
        .catch(e => {
          console.error('Error while updating discount code', e);
          this.notify.error(this.l10n.t('An unexpected error has occurred. Discount code cannot be updated.'));
        });
    }
  }
});
