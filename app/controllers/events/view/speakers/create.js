import Controller from '@ember/controller';
export default Controller.extend({
  actions: {
    async save(sessionDetails) {
      try {
        this.set('isLoading', true);
        if (!sessionDetails) {
          await this.get('model.session').save();
        }
        let newSpeaker = this.get('model.speaker');
        if (newSpeaker.isEmailOverridden) {
          newSpeaker.set('email', this.authManager.currentUser.email);
        }
        await newSpeaker.save();
        if (!sessionDetails) {
          this.get('model.speaker.sessions').pushObject(this.get('model.session'));
          await this.get('model.session').save();
        } else {
          this.get('model.speaker.sessions').pushObject(sessionDetails);
        }
        await this.get('model.speaker').save();
        this.notify.success(this.l10n.t('Your session has been saved'));
        this.transitionToRoute('events.view.speakers', this.get('model.event.id'));
      } catch (e) {
        this.notify.error(this.l10n.t('Oops something went wrong. Please try again'));
      }
    }
  }
});
