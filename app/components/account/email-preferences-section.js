import Component from '@ember/component';

export default Component.extend({
  actions: {
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
          this.notify.error(this.l10n.t('An unexpected error occurred.'), {
            id: 'email_error'
          });
        });
    }
  }
});
