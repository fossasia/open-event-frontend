import Controller from '@ember/controller';

export default Controller.extend({

  actions: {
    save() {
      try {
        let systemMessages = this.get('model');
        systemMessages.forEach(systemMessage => {
          systemMessage.save();
        });
        this.get('notify').success(this.get('l10n').t('Changes have been saved successfully'));
      } catch (e) {
        this.get('notify').error(this.get('l10n').t(e.errors[0].detail));
      }
    }
  }
});
