import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.get('l10n').t('Images');
  },

  async model() {
    return {
      speakerImageSize : await this.get('store').queryRecord('speaker-image-size', 1),
      eventImageSize   : await this.get('store').queryRecord('event-image-size', 1)
    };
  },
  actions: {
    willTransition() {
      this.get('controller.model').forEach(image => {
        image.rollbackAttributes();
      });
    }
  }
});
