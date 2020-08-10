import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import ModalBase from 'open-event-frontend/components/modals/modal-base';

@classic
export default class SessionNotifyModal extends ModalBase {

  @action
  notifySession() {
    console.log('>>> Notify');
  }

}
