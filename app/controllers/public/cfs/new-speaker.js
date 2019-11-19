import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    save() {
      this.set('isLoading', true);
      this.get('model.speaker').save()
        .then(() => {
          this.notify.success(this.l10n.t('Speaker details have been saved'),
            {
              id: 'speaker_det_save'
            });
          this.transitionToRoute('public.cfs.index');
        })
        .catch(() => {
          this.notify.error(this.l10n.t('Oops something went wrong. Please try again'));
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    }
  }
});
