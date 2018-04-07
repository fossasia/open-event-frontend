import Component from '@ember/component';

export default Component.extend({
  actions: {
    savePreference(emailPreference) {
      emailPreference.save()
        .then(() => {
          this.get('notify').success(this.get('l10n').t('Email notifications updated successfully'));
        })
        .catch(() => {
          emailPreference.rollbackAttributes();
          this.get('notify').error(this.get('l10n').t('An unexpected error occurred.'));
        });
    }
  }
});
