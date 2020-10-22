import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Component from '@ember/component';

@classic
export default class EmailPreferencesSection extends Component {
  @action
  savePreference(emailPreference) {
    emailPreference.save()
      .then(() => {
        this.notify.success(this.l10n.t('Email notifications updated successfully'), {
          id: 'email_notif'
        });
      })
      .catch(e => {
        console.error('Error while updating email notifications.', e);
        emailPreference.rollbackAttributes();
        this.notify.error(this.l10n.t('An unexpected error has occurred.'), {
          id: 'email_error'
        });
      });
  }
}
