import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class extends Controller {

  @service errorHandler;

  @action
  save() {
    this.set('isLoading', true);
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
                  id: 'session_edit_save'
                });
              this.transitionToRoute('events.view.session.view', this.model.event.id, this.model.session.id);
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
      this.model.speaker.deleteRecord();
      this.model.session.save()
        .then(() => {
          this.notify.success(this.l10n.t('Your session has been saved'),
            {
              id: 'session_saved'
            });
          this.transitionToRoute('events.view.session.view', this.model.event.id, this.model.session.id);
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
