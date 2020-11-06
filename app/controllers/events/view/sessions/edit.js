import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class extends Controller {
  @action
  save() {
    this.set('isLoading', true);
    if (this.addNewSpeaker) {
      const newSpeaker = this.model.speaker;
      if (newSpeaker.isEmailOverridden) {
        newSpeaker.set('email', this.authManager.currentUser.email);
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
              this.transitionToRoute('events.view.sessions', this.model.event.id);
            })
            .catch(e =>   {
              console.error('Error while saving session', e);
              this.notify.error(this.l10n.t('Oops something went wrong. Please try again'),
                {
                  id: 'session_edit_error'
                });
            })
            .finally(() => {
              this.set('isLoading', false);
            });
        })
        .catch(e =>   {
          console.error('Error while saving session', e);
          this.notify.error(this.l10n.t('Oops something went wrong. Please try again'),
            {
              id: 'session_edit_wrong'
            });
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
          this.transitionToRoute('events.view.sessions', this.model.event.id);
        })
        .catch(e => {
          console.error('Error while saving session', e);
          this.notify.error(this.l10n.t('Oops something went wrong. Please try again'),
            {
              id: 'session_edit_error'
            });
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    }
  }
}
