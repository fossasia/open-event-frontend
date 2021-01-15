import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class extends Controller {
  @action
  save() {
    try {
      const systemMessages = this.model;
      systemMessages.forEach(systemMessage => {
        systemMessage.save();
      });
      this.notify.success(this.l10n.t('Changes have been saved successfully'),
        {
          id: 'message_success'
        });
    } catch (e) {
      console.error('Error while saving system messages', e);
      this.notify.error(this.l10n.t(e.errors[0].detail),
        {
          id: 'change_error_message'
        });
    }
  }
}
