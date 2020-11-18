import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import FormMixin from 'open-event-frontend/mixins/form';
import ModalBase from 'open-event-frontend/components/modals/modal-base';

@classic
export default class AddRoomModal extends ModalBase.extend(FormMixin) {
  isSmall = true;
  autoScrollToErrors = false;

  @action
  submit(event) {
    event.preventDefault();
    this.onValid(async() => {
      await this.room.save();
      this.notify.success(this.l10n.t('{{item}} has been created successfully', {
        item: this.l10n.t('Room')
      }));
      this.close();
      this.onAdded?.();
    });
  }

  onOpen() {
    this.set('room', this.store.createRecord('microlocation', {
      event: this.event
    }));
  }

  onClose() {
    if (!this.room.get('id')) {
      this.room.unloadRecord();
    }
  }

  getValidationRules() {
    return {
      inline : true,
      delay  : false,
      on     : 'blur',
      fields : {
        name: {
          rules: [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter a name')
            }
          ]
        }
      }
    };
  }
}
