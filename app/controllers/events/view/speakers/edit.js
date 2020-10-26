import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class extends Controller {
  @action
  save() {
    this.set('isLoading', true);
    const { speaker } = this.model;
    if (speaker.isEmailOverridden) {
      speaker.set('email', null);
    }
    speaker.save()
      .then(() => {
        this.notify.success(this.l10n.t('Speaker details have been saved'));
        this.transitionToRoute('events.view.speakers');
      })
      .catch(() => {
        this.notify.error(this.l10n.t('Oops something went wrong. Please try again'));
      })
      .finally(() => {
        this.set('isLoading', false);
      });
  }
}
