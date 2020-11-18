import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import FormMixin from 'open-event-frontend/mixins/form';
import ModalBase from 'open-event-frontend/components/modals/modal-base';

@classic
export default class AddSystemRoleModal extends ModalBase.extend(FormMixin) {
  isSmall = true;
  autoScrollToErrors = false;

  @action
  addRole() {
    this.onValid(() => {
      this.addSystemRole();
    });
  }

  @action
  toggleCheckbox(permission) {
    permission.toggleProperty('isChecked');
  }

  @action
  close() {
    if (!this.role.id) {
      this.role.unloadRecord();
    }
    this.set('isOpen', false);
  }

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
}
