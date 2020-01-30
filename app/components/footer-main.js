import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  tagName       : 'footer',
  classNames    : ['ui', 'inverted', 'vertical', 'footer', 'segment'],
  geolocation   : service(),
  currentLocale : computed(function() {
    return this.l10n.getLocale();
  }),
  actions: {
    switchLanguage(locale) {
      this.l10n.switchLanguage(locale);
    },
    getUserLocation() {
      let currentlocation = navigator.geolocation.getCurrentPosition( position => {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        let url = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng+"&key=AIzaSyDEmpxGnTRr_CKeiim6OrvsZLvXrppJCnE";
        this.set('userLocation', [lat, lng]);
      });
    }
  },

  didInsertElement() {
    this.set('eventLocations', this.eventLocations.sortBy('name'));

    let eventTypes = this.eventTypes.sortBy('name').toArray();
    eventTypes.forEach(eventType => {
      if (eventType.name === 'Other') {
        let other = eventType;
        eventTypes.splice(eventTypes.indexOf(eventType), 1);
        eventTypes.push(other);
      }
    });
    this.set('eventTypes', eventTypes);
  }
});
