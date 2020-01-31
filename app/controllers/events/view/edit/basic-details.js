import Controller from '@ember/controller';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';

export default Controller.extend(EventWizardMixin, {
  actions: {
    save() {
      this.saveEventDataAndRedirectTo(
        'events.view.index',
        ['tickets', 'socialLinks', 'copyright', 'tax', 'stripeAuthorization']
      );
    },
    move() {
      this.saveEventDataAndRedirectTo(
        'events.view.edit.attendee',
        ['tickets', 'socialLinks', 'copyright', 'tax', 'stripeAuthorization']
      );
    }
  }
});
