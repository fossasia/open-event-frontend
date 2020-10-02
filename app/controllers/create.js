import Controller from '@ember/controller';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';
import { action } from '@ember/object';

export default class extends Controller.extend(EventWizardMixin) {
  @action
  save() {
    this.saveEventDataAndRedirectTo(
      'events.view.index',
      ['tickets', 'socialLinks', 'copyright', 'tax', 'stripeAuthorization']
    );
  }

  @action
  move() {
    this.saveEventDataAndRedirectTo(
      'events.view.edit.other-details',
      ['tickets', 'socialLinks', 'copyright', 'tax', 'stripeAuthorization']
    );
  }
}

