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
              prompt : this.get('l10n').t('Please enter a role name')
            }
          ]
        },
        selectedPanels: {
          identifier : 'selected_panels',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please select atleast one panel')
            }
          ]
        }
      }
    };
  }
});
