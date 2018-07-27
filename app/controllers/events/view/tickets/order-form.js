import Controller from '@ember/controller';

export default Controller.extend({
  /**
   * Save the forms.
   */
  async saveForms(data) {
    for (const customForm of data.customForms ? data.customForms.toArray() : []) {
      await customForm.save();
    }
    return data;
  },

  actions: {
    save(data) {
      this.set('isLoading', true);
      this.saveForms(data)
        .then(() => {
          this.get('notify').success(this.get('l10n').t('Your Attendee form has been saved'));
        })
        .catch(e => {
          console.error(e);
          this.get('notify').error(this.get('l10n').t('Oops something went wrong. Please try again'));
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    }
  }
});
