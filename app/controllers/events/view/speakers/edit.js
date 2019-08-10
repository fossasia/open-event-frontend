import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    save() {
      this.set('isLoading', true);
      let speaker = this.get('model.speaker');
      if (speaker.isEmailOverridden) {
        speaker.set('email', this.authManager.currentUser.email);
      }
      speaker.save()
        .then(() => {
          this.notify.success(this.l10n.t('Speaker details have been saved'));
          this.transitionToRoute('events.view.speakers');
        })
        .catch(() => {
          this.notify.error(this.l10n.t('Oops something went wrong. Please try again'));
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    }
  }
});
