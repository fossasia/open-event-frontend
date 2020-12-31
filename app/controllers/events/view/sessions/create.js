import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class extends Controller {

  @service errorHandler;

  @action
  async save() {
    await this.model.session.save();
    if (this.addNewSpeaker) {
      const newSpeaker = this.model.speaker;
      if (newSpeaker.isEmailOverridden) {
        newSpeaker.set('email', null);
      }

      newSpeaker.save()
        .then(() => {
          newSpeaker.sessions.pushObject(this.model.session);
          this.model.session.save()
            .then(() => {
              this.notify.success(this.l10n.t('Your session has been saved'),
                {
                  id: 'session_save_dash'
                });
              this.transitionToRoute('events.view.sessions', this.model.event.id);
            })
            .catch(e =>   {
              console.error('Error while saving session', e);
              this.errorHandler.handle(e);
            })
            .finally(() => {
              this.set('isLoading', false);
            });
        })
        .catch(e =>   {
          console.error('Error while saving session', e);
          this.errorHandler.handle(e);
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    } else {
      this.model.session.save()
        .then(() => {
          this.notify.success(this.l10n.t('Your session has been saved'),
            {
              id: 'session_save'
            });
          this.transitionToRoute('events.view.sessions', this.model.event.id);
        })
        .catch(e => {
          console.error('Error while saving session', e);
          this.errorHandler.handle(e);
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    }
  }
}

