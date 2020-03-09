import ModalBase from 'open-event-frontend/components/modals/modal-base';

export default ModalBase.extend({
  isSmall : true,
  actions : {
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
});
