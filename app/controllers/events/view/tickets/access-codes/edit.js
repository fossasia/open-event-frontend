import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    save(accessCode) {
      accessCode.save()
        .then(() => {
          this.notify.success(this.l10n.t('Access code has been successfully updated.'));
          this.transitionToRoute('events.view.tickets.access-codes');
        })
        .catch(e => {
          console.error('Error while updating access code', e);
          this.notify.error(this.l10n.t('An unexpected error has occurred. Access code cannot be created.'));
        });
    }
  }
});
