import FormMixin from 'open-event-frontend/mixins/form';
import ModalBase from 'open-event-frontend/components/modals/modal-base';

export default ModalBase.extend(FormMixin, {
  actions: {
    submit() {
      this.onValid(() => {
        this.transferEvent();
      });
    },
    close() {
      if (!this.currentInvite.id) {
        this.currentInvite.unloadRecord();
      }
      this.set('isOpen', false);
    }
  },

  getValidationRules() {

    return {
      inline : true,
      delay  : false,
      on     : 'blur',
      fields : {
        newOwnerEmail: {
          identifier : 'user_email',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter an email for new organizer')
            },
            {
              type   : 'email',
              prompt : this.l10n.t('Please enter a valid email address  for new organizer')
            }
          ]
        }
      }
    };
  }
});
