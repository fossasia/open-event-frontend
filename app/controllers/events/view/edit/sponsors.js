import Controller from '@ember/controller';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';

export default Controller.extend(EventWizardMixin, {

  actions: {
    save() {
      this.saveEventDataAndRedirectTo(
        'events.view.index',
        ['sponsors']
      );
    },
    move(direction) {
      this.saveEventDataAndRedirectTo(
        direction === 'forwards' ? 'events.view.edit.sessions-speakers' : 'events.view.edit.attendee',
        ['sponsors']
      );
    }
  }

});
