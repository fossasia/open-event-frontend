import Controller from '@ember/controller';
export default Controller.extend({
  actions: {
    async save() {
      try {
        this.set('isLoading', true);
        await this.get('model.speaker').save();
        this.get('model.speaker.sessions').pushObject(this.get('model.session'));
        await this.get('model.session').save();
        await this.get('model.speaker').save();
        this.get('notify').success(this.get('l10n').t('Your session has been saved'));
        this.transitionToRoute('events.view.sessions', this.get('model.event.id'));
      } catch (e) {
        this.get('notify').error(this.get('l10n').t('Oops something went wrong. Please try again'));
      }
    }
  }
});
