import Controller from '@ember/controller';
export default Controller.extend({
  actions: {
    async save(speakerDetails) {
      this.set('isLoading', true);
      try {
        await this.model.session.save();
        speakerDetails.sessions.pushObject(this.model.session);
        await this.model.session.save();
        this.notify.success(this.l10n.t('Your session has been saved'),
          {
            id: 'sess_save_succ'
          });
        this.transitionToRoute('public.cfs.index');
      } catch (e) {
        this.notify.error(this.l10n.t('Oops something went wrong. Please try again'));
      }
      this.set('isLoading', false);
    }
  }
});
