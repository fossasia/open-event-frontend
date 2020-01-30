import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName       : 'footer',
  classNames    : ['ui', 'inverted', 'vertical', 'footer', 'segment'],
  currentLocale : computed(function() {
    return this.l10n.getLocale();
  }),
  actions: {
    switchLanguage(locale) {
      this.l10n.switchLanguage(locale);
    },
    getUserLocation() {
      let currentlocation = navigator.geolocation.getCurrentPosition( position => { 
        let url = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+position.coords.latitude+","+position.coords.latitude+"&key=AIzaSyDEmpxGnTRr_CKeiim6OrvsZLvXrppJCnE";
        this.set('userLocation',[position.coords.latitude,position.coords.longitude]);
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
