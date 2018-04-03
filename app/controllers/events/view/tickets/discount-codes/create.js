import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    saveCode(code) {
      code.save()
        .then(() => {
          this.get('notify').success(this.l10n.t('Discount code has been successfully created.'));
        })
        .catch(()=> {
          this.get('notify').error(this.l10n.t('An unexpected error has occured. Discount code cannot be created.'));
        });
    }
  }
});
