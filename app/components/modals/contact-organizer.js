import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import ModalBase from 'open-event-frontend/components/modals/modal-base';

@classic
export default class EditUserModal extends ModalBase {
  @tracked message = '';
  @tracked isLoading = false;

  @action
  async contactOrganizer() {
    this.set('isLoading', true);
    const payload = {};
    payload.email = this.message;
    try {
      const response = await this.loader.post(`/events/${this.event.id}/contact-organizer`, payload);
      if (!response?.success) {throw response}
      this.notify.success(this.l10n.t('Organizer contacted successfully'), {
        id: 'contact_organizer_succ'
      });
      this.close();
    } catch (e) {
      console.error('Error while contacting organizer', e);
      this.notify.error(this.l10n.t('An unexpected error has occurred.'), {
        id: 'contact_organizer_err'
      });
    } finally {
      this.set('isLoading', false);
    }
  }
}
