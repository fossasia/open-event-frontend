import Controller from '@ember/controller';
export default Controller.extend({
  actions: {
    async save(speakerDetails) {
      try {
        this.set('isLoading', true);
        await this.get('model.session').save();
        speakerDetails.sessions.pushObject(this.get('model.session'));
        await this.get('model.session').save();
        this.notify.success(this.l10n.t('Your session has been saved'));
        this.transitionToRoute('public.cfs.index');
      } catch (e) {
        this.notify.error(this.l10n.t('Oops something went wrong. Please try again'));
      }
    }
  }
});
