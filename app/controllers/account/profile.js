import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class extends Controller {
  @action
  async updateContactInfo() {
    this.set('isLoading', true);
    try {
      await this.model.save();
      this.notify.success(this.l10n.t('Your Contact Info has been updated'),
        {
          id: 'cont_info_upd'
        });
    }  catch (error) {
      this.notify.error(this.l10n.t(error.message),
        {
          id: 'cont_upd_error'
        });
    }

    this.set('isLoading', false);
  }
}
