import { computed } from '@ember/object';
import ModalBase from 'open-event-frontend/components/modals/modal-base';

export default ModalBase.extend({
  isSmall          : true,
  confirmEventName : '',
  isNameDifferent  : computed('confirmEventName', 'eventName', function() {
    return this.eventName ? this.confirmEventName.toLowerCase() !== this.eventName.toLowerCase() : true;
  })
});
