import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import FormMixin from 'open-event-frontend/mixins/form';
import ModalBase from 'open-event-frontend/components/modals/modal-base';

@classic
export default class AddUserRoleModal extends ModalBase.extend(FormMixin) {
  isSmall = true;
  autoScrollToErrors = false;

  @action
  addRole() {
    this.onValid(() => {
      this.sendAction('updateUserRoles');
    });
  }

  @action
  close() {
    this.set('isOpen', false);
  }

  unloadRecord() {
    if (!this.currentInvite.get('id')) {
      this.currentInvite.unloadRecord();
    }
  }

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
}
