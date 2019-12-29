import FormMixin from 'open-event-frontend/mixins/form';
import ModalBase from 'open-event-frontend/components/modals/modal-base';

export default ModalBase.extend(FormMixin, {
  isSmall            : true,
  autoScrollToErrors : false,

  actions: {
    addRole() {
      this.onValid(() => {
        this.sendAction('addSystemRole');
      });
    },
    toggleCheckbox(permission) {
      permission.toggleProperty('isChecked');
    },
    close() {
      if (!this.get('role.id')) {
        this.role.unloadRecord();
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
          identifier : 'role_name',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter a role name')
            }
          ]
        }
      }
    };
  }
});
