import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.l10n.t('Images');
  },

  model() {
    return this.get('store').query('image-size', {
      sort: 'id'
    });
  },
  actions: {
    willTransition() {
      this.get('controller.model').forEach(image => {
        image.rollbackAttributes();
      });
    }
  }
});
