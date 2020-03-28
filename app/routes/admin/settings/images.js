import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.l10n.t('Images');
  },

  async model() {
    return {
      speakerImageSize : await this.store.queryRecord('speaker-image-size', 1),
      eventImageSize   : await this.store.queryRecord('event-image-size', 1)
    };
  },
  actions: {
    willTransition() {
      this.controller.model.speakerImageSize.rollbackAttributes();
      this.controller.model.eventImageSize.rollbackAttributes();
    }
  }
});
