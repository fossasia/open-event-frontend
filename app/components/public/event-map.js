import Component from '@ember/component';
import { computed } from '@ember/object';
import ENV from 'open-event-frontend/config/environment';

export default Component.extend({
  mapTile: ENV.mapboxToken ? `https://api.mapbox.com/styles/v1/mapbox/emerald-v8/tiles/{z}/{x}/{y}?access_token=${ENV.mapboxToken}` : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',

  latitude: computed('event', function() {
    return this.event?.latitude ? this.event.latitude : 20;
  }),

  longitude: computed('event', function() {
    return this.event?.longitude ? this.event.longitude : 80;
  })
});
