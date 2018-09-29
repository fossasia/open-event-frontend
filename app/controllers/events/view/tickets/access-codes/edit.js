import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    save(accessCode) {
      accessCode.save()
        .then(() => {
          this.get('notify').success(this.get('l10n').t('Access code has been successfully updated.'));
          this.transitionToRoute('events.view.tickets.access-codes');
        })
        .catch(() => {
          this.get('notify').error(this.get('l10n').t('An unexpected error has occured. Discount code cannot be created.'));
        });
    }
  }
});
