import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import FormMixin from 'open-event-frontend/mixins/form';
import ModalBase from 'open-event-frontend/components/modals/modal-base';

@classic
export default class RoomInfoModal extends ModalBase.extend(FormMixin) {
  @action
  close() {
    this.set('isOpen', false);
  }
}
