import Component from '@ember/component';

export default Component.extend({
  classNames : ['ui', 'stackable', 'grid'],
  actions    : {
    onLocationChangeHandler(lat, lng) {
      this.setProperties({
        zoom: 17,
        lat,
        lng
      });
    }
  }
});
