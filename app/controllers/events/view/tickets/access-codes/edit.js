import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    save(accessCode) {
      accessCode.save()
        .then(() => {
          this.notify.success(this.l10n.t('Access code has been successfully updated.'));
          this.transitionToRoute('events.view.tickets.access-codes');
        })
        .catch(() => {
          this.notify.error(this.l10n.t('An unexpected error has occured. Access code cannot be created.'));
        });
    }
  }
});
