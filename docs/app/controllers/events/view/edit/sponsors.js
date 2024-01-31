import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Controller from '@ember/controller';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';

@classic
export default class SponsorsController extends Controller.extend(EventWizardMixin) {
  @action
  save() {
    this.saveEventDataAndRedirectTo(
      'events.view.index',
      ['sponsors', 'tickets']
    );
  }

  @action
  move(direction) {
    this.saveEventDataAndRedirectTo(
      direction === 'forwards' ? 'events.view.edit.sessions-speakers' : 'events.view.edit.badge',
      ['sponsors', 'tickets']
    );
  }
}
