import { computed } from '@ember/object';
import ModalBase from 'open-event-frontend/components/modals/modal-base';

export default ModalBase.extend({
  isSmall         : true,
  confirmName     : '',
  isNameDifferent : computed('confirmName', function() {
    return this.get('eventName') ? this.get('confirmName').toLowerCase() !== this.get('eventName').toLowerCase() : true;
  })
});
