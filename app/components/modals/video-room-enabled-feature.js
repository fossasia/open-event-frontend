import classic from 'ember-classic-decorator';
import ModalBase from 'open-event-frontend/components/modals/modal-base';
import { action } from '@ember/object';

@classic
export default class VideoRoomEnabledFeature extends ModalBase {

  @action
  toggleView() {
    this.set('isOpen', false);
  }

}
