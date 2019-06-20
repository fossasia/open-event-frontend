import Controller from '@ember/controller';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';

export default Controller.extend(EventWizardMixin, {
  async saveForms(data) {
    for (const customForm of data.customForms ? data.customForms.toArray() : []) {
      await customForm.save();
    }
    return data;
  },
  actions: {
    async save(data) {
      try {
        await this.saveForms(data);
        this.saveEventDataAndRedirectTo(
          'events.view.index',
          []
        );  
      } catch (error) {
        this.notify.error(this.ln10.t(error.message));
      }
    },
    async move(direction, data) {
      try {
        await this.saveForms(data);
        this.saveEventDataAndRedirectTo(
          direction === 'forwards' ? 'events.view.edit.sponsors' : 'events.view.edit.basic-details',
          []
        );  
      } catch (error) {
        this.notify.error(this.ln10.t(error.message));
      }
    }
  }
});
