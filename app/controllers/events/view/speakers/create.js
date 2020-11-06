import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class extends Controller {
  @action
  async save(sessionDetails) {
    try {
      this.set('isLoading', true);
      if (!sessionDetails) {
        await this.model.session.save();
      }
      const newSpeaker = this.model.speaker;
      if (newSpeaker.isEmailOverridden) {
        newSpeaker.set('email', null);
      }
      await newSpeaker.save();
      if (!sessionDetails) {
        this.model.speaker.sessions.pushObject(this.model.session);
        await this.model.session.save();
      } else {
        this.model.speaker.sessions.pushObject(sessionDetails);
      }

      await this.model.speaker.save();
      this.notify.success(this.l10n.t('Your session has been saved'));
      this.transitionToRoute('events.view.speakers', this.model.event.id);
    } catch (e) {
      this.notify.error(this.l10n.t('Oops something went wrong. Please try again'));
    }
  }
}

