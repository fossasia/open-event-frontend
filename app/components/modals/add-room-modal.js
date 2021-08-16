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

  @action
  async toggle() {
    try {
      await this.confirm.prompt(this.l10n.t('If you hide this microlocation you will not be able to schedule sessions in it. The location will still be available for online events without scheduled sessions, e.g. break-out or discussion rooms. '));
    } catch {
      return;
    }
    this.room.hiddenInScheduler = !this.room.hiddenInScheduler;
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
