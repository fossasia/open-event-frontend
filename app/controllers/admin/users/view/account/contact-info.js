import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class extends Controller {
  @action
  updateContactInfo() {
    this.set('isLoading', true);
    let currentUser = this.model.user;
    currentUser.save()
      .then(() => {
        this.notify.success(this.l10n.t('Your Contact Info has been updated'));
      })
      .catch(() => {
        this.notify.error(this.l10n.t('An unexpected error occurred'));
      })
      .finally(() => {
        this.set('isLoading', false);
      });
  }
}

