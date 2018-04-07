import ModalBase from 'open-event-frontend/components/modals/modal-base';

export default ModalBase.extend({
  isSmall : true,
  actions : {
    updatePlaceholder() {
      this.get('placeholder').then(placeholder => {
        placeholder.save()
          .then(() => {
            this.set('isOpen', false);
            this.notify.success(this.get('l10n').t('Placeholder has been saved successfully.'));
          })
          .catch(()=> {
            this.notify.error(this.get('l10n').t('An unexpected error has occurred. Placeholder not saved.'));
          });
      });
    }
  }
});
