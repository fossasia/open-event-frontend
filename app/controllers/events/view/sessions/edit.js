import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    save() {
      this.set('isLoading', true);
      var _this = this;
      if (this.get('addNewSpeaker')) {
        let newSpeaker = this.get('model.speaker');
        newSpeaker.save()
          .then(() => {
            newSpeaker.sessions.pushObject(_this.get('model.session'));
            _this.get('model.session').save()
              .then(() => {
                _this.get('notify').success(_this.get('l10n').t('Your session has been saved'));
                _this.transitionToRoute('events.view.sessions', _this.get('model.event.id'));
              })
              .catch(() =>   {
                _this.get('notify').error(this.get('l10n').t('Oops something went wrong1. Please try again'));
              })
              .finally(() => {
                _this.set('isLoading', false);
              });
          })
          .catch(() =>   {
            this.get('notify').error(this.get('l10n').t('Oops something went wrong2. Please try again'));
          })
          .finally(() => {
            this.set('isLoading', false);
          });
      } else {
        this.get('model.session').save()
          .then(() => {
            this.get('notify').success(this.get('l10n').t('Your session has been saved'));
            this.transitionToRoute('events.view.sessions', this.get('model.event.id'));
          })
          .catch(() => {
            this.get('notify').error(this.get('l10n').t('Oops something went wrong4. Please try again'));
          })
          .finally(() => {
            this.set('isLoading', false);
          });
      }

    }
  }
});
