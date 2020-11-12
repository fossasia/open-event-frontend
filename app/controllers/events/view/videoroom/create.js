import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class extends Controller {
  @action
  async save() {
    try {
      this.loading = true;
      await this.model.stream.save();
      this.notify.success(this.l10n.t('Your stream has been saved'),
        {
          id: 'stream_save'
        });
      this.transitionToRoute('events.view.videoroom', this.model.event.id);
    } catch (e) {
      console.error('Error while saving session', e);
      this.notify.error(this.l10n.t('Oops something went wrong. Please try again'),
        {
          id: 'stream_save_error'
        });
    } finally {
      this.loading = false;
    }
  }
}
