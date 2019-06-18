import Component from '@ember/component';

export default Component.extend({
  actions: {
    savePreference(emailPreference) {
      emailPreference.save()
        .then(() => {
          this.notify.success(this.l10n.t('Email notifications updated successfully'));
        })
        .catch(() => {
          emailPreference.rollbackAttributes();
          this.notify.error(this.l10n.t('An unexpected error occurred.'));
        });
    }
  }
});
