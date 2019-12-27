import Controller from '@ember/controller';
import { computed } from '@ember/object';
import moment from 'moment';

export default Controller.extend({
  queryParams : ['event_name', 'start_date', 'end_date', 'location'],
  start_date  : null,
  end_date    : null,
  location    : null,
  event_name  : null,
  filterDate  : null,

  callForSpeakersEvents: computed('filteredEvents.[]', function() {
    return this.filteredEvents.filter(event => {
      const callForPapers = event.get('speakersCall');
      const sessionEnabled = event.isSessionsSpeakersEnabled;
      if (!callForPapers || !callForPapers.get('startsAt')  || !callForPapers.get('endsAt')) {
        return false;
      }
      const startDateTime = callForPapers.get('startsAt');
      const endDateTime = callForPapers.get('endsAt');
      const privacyState = callForPapers.get('privacy');
      return (moment().isBetween(startDateTime, endDateTime) && (sessionEnabled) && (privacyState === 'public'));
    });
  }),

  featuredEvents: computed('filteredEvents.[]', function() {
    return this.filteredEvents ? this.filteredEvents.filter(event => {return event.isFeatured}) : null;

  }),
    marker: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [ -96.7969879, 32.7766642 ] }
      }
    ]
  },

  actions: {
    shareEvent(event) {
      this.set('eventToShare', event);
      this.set('isShareModalOpen', true);
    },
        mapClicked({ target: map, point }) {
      console.log(map, point);
    }
  }
});
