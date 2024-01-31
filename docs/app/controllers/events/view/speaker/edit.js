import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class extends Controller {

  @service errorHandler;

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
        this.transitionToRoute('events.view.speaker.view', this.model.speaker.id);
      })
      .catch(e => {
        console.error('Error while saving speaker details', e);
        this.errorHandler.handle(e);
      })
      .finally(() => {
        this.set('isLoading', false);
      });
  }
}
