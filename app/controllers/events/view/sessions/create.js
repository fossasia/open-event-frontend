import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class extends Controller {
  @action
  async save() {
    await this.model.session.save();
    if (this.addNewSpeaker) {
      let newSpeaker = this.model.speaker;
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
                  id: 'session_save_dash'
                });
              this.transitionToRoute('events.view.sessions', this.model.event.id);
            })
            .catch(() =>   {
              this.notify.error(this.l10n.t('Oops something went wrong. Please try again'),
                {
                  id: 'session_crea_some_error'
                });
            })
            .finally(() => {
              this.set('isLoading', false);
            });
        })
        .catch(() =>   {
          this.notify.error(this.l10n.t('Oops something went wrong. Please try again'),
            {
              id: 'error_unexp_session'
            });
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    } else {
      this.get('model.session').save()
        .then(() => {
          this.notify.success(this.l10n.t('Your session has been saved'),
            {
              id: 'session_save'
            });
          this.transitionToRoute('events.view.sessions', this.model.event.id);
        })
        .catch(() => {
          this.notify.error(this.l10n.t('Oops something went wrong. Please try again'),
            {
              id: 'session_error_wrong'
            });
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    }
  }
}

