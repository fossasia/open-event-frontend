import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  titleToken() {
    return this.l10n.t('Images');
  },

  model() {
    return [
      {
        type             : 'event',
        fullWidth        : 1300,
        fullHeight       : 500,
        fullAspect       : true,
        fullQuality      : 80,
        iconWidth        : 75,
        iconHeight       : 30,
        iconAspect       : false,
        iconQuality      : 80,
        thumbnailWidth   : 500,
        thumbnailHeight  : 200,
        thumbnailAspect  : false,
        thumbnailQuality : 80,
        logoWidth        : 75,
        logoHeight       : 30
      },
      {
        type             : 'profile',
        iconWidth        : 35,
        iconHeight       : 35,
        iconQuality      : 80,
        thumbnailWidth   : 150,
        thumbnailHeight  : 150,
        thumbnailQuality : 80,
        smallWidth       : 50,
        smallHeight      : 50,
        smallQuality     : 80
      }
    ];
  }
});
