import Controller from '@ember/controller';

export default Controller.extend({
  /**
   * Save the event and the forms.
   */
  async saveForms(data) {
    await data.event.save();
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
          this.notify.success(this.l10n.t('Your Attendee form has been saved'));
        })
        .catch(e => {
          console.error(e);
          this.notify.error(this.l10n.t(e.errors[0].detail));
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    }
  }
});
