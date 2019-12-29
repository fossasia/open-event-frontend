import FormMixin from 'open-event-frontend/mixins/form';
import ModalBase from 'open-event-frontend/components/modals/modal-base';

export default ModalBase.extend(FormMixin, {
  isSmall            : true,
  autoScrollToErrors : false,

  actions: {
    addRole() {
      this.onValid(() => {
        this.sendAction('updateUserRoles');
      });
    },
    close() {
      if (!this.currentInvite.get('id')) {
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
        email: {
          identifier : 'user_email',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter an email for user')
            },
            {
              type   : 'email',
              prompt : this.l10n.t('Please enter a valid email address  for user')
            }
          ]
        },
        role: {
          identifier : 'user_role',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please select a role')
            }
          ]
        }
      }
    };
  }
});
