import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class extends Controller {
  @service errorHandler;

  @action
  async save(sessionDetails) {
    try {
      this.set('isLoading', true);
      this.model.speaker.event = this.model.event;
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
      console.error('Error while saving session', e);
      this.errorHandler.handle(e);
    } finally {
      this.set('isLoading', false);
    }
  }
}

