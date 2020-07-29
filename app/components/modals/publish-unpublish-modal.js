import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import ModalBase from 'open-event-frontend/components/modals/modal-base';

@classic
export default class PublishUnpublishModal extends ModalBase {
  @action
  toggleView() {
    this.set('isOpen', false);
  }
}
