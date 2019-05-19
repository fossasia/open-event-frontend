import { computed } from '@ember/object';
import ModalBase from 'open-event-frontend/components/modals/modal-base';

export default ModalBase.extend({
  isSmall         : true,
  confirmName     : '',
  isNameDifferent : computed('confirmName', function() {
    return this.eventName ? this.confirmName.toLowerCase() !== this.eventName.toLowerCase() : true;
  })
});
