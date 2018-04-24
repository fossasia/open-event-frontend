import Controller from '@ember/controller';
export default Controller.extend({
  actions: {
    save() {
      this.set('isLoading', true);
      this.get('model.speaker.sessions').addObject(this.get('model.session'));
      this.get('model.session.speakers').addObject(this.get('model.speaker'));

      this.get('model.session').save()
        .then(() => {
          this.get('model.speaker').save()
            .then(() => {
              this.get('notify').success(this.get('l10n').t('Your session has been saved'));
              this.transitionToRoute('events.view.sessions', this.get('model.event.id'));
            });
        })
        .catch(() => {
          this.get('notify').error(this.get('l10n').t('Oops something went wrong. Please try again'));
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    }
  }
});
