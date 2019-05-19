import { computed } from '@ember/object';
import ModalBase from 'open-event-frontend/components/modals/modal-base';

export default ModalBase.extend({
  isSmall          : true,
  confirmEmail     : '',
  isEmailDifferent : computed('confirmEmail', function() {
    return this.userEmail ? this.confirmEmail !== this.userEmail : true;
  })
});
