import { computed } from '@ember/object';
import ModalBase from 'open-event-frontend/components/modals/modal-base';

export default ModalBase.extend({
  isSmall          : true,
  confirmEmail     : '',
  isEmailDifferent : computed('confirmEmail', function() {
    return this.get('userEmail') ? this.get('confirmEmail') !== this.get('userEmail') : true;
  })
});
