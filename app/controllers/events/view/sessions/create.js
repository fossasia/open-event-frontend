import Controller from '@ember/controller';
export default Controller.extend({
  actions: {
    async save(speakerDetails) {
      try {
        this.set('isLoading', true);
        if (!speakerDetails) {
          await this.get('model.speaker').save();
        }
        await this.get('model.session').save();
        if (!speakerDetails) {
          this.get('model.speaker.sessions').pushObject(this.get('model.session'));
          await this.get('model.session').save();
        } else {
          speakerDetails.sessions.pushObject(this.get('model.session'));
        }
        await this.get('model.session').save();
        this.get('notify').success(this.get('l10n').t('Your session has been saved'));
        this.transitionToRoute('events.view.sessions', this.get('model.event.id'));
      } catch (e) {
        this.get('notify').error(this.get('l10n').t('Oops something went wrong. Please try again'));
      }
    }
  }
});
