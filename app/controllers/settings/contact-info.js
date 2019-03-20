import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    updateContactInfo() {
      this.set('isLoading', true);
      let currentUser = this.get('model');
      if (verifyPhoneNumber(currentUser.contact)) {
        currentUser.save()
          .then(() => {
            this.get('notify').success(this.get('l10n').t('Your Contact Info has been updated'));
          })
          .catch(() => {
            this.get('notify').error(this.get('l10n').t('An unexpected error occurred'));
          })
          .finally(() => {
            this.set('isLoading', false);
          });
      } else {
        this.get('notify').error(this.get('l10n').t('Please enter the valid phone number'));
        this.set('isLoading', false);
      }
    }
  }
});

function verifyPhoneNumber(number) {
  if (!isNaN(number) && number.length === 10) {
    return true;
  } else {
    return false;
  }
}
