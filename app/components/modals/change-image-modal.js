import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import ModalBase from 'open-event-frontend/components/modals/modal-base';

@classic
export default class ChangeImageModal extends ModalBase {
  isSmall = true;

  @action
  updatePlaceholder() {
    this.placeholder.then(placeholder => {
      placeholder.save()
        .then(() => {
          this.set('isOpen', false);
          this.notify.success(this.l10n.t('Placeholder has been saved successfully.'), {
            id: 'placeholder_sav'
          });
        })
        .catch(e => {
          console.error('Error while saving placeholder.', e);
          this.notify.error(this.l10n.t('An unexpected error has occurred. Placeholder not saved.'), {
            id: 'placeholder_err'
          });
        });
    });
  }
}
