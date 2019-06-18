import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    async updateContactInfo() {
      this.set('isLoading', true);
      try {
        await this.model.save();
        this.notify.success(this.l10n.t('Your Contact Info has been updated'));
      }  catch (error) {
        this.notify.error(this.l10n.t(error.message));
      }
      this.set('isLoading', false);
    }
  }
});
