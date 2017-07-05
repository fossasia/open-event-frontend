import Ember from 'ember';
import moment from 'moment';

const { Controller, computed } = Ember;

export default Controller.extend({

  callForSpeakersEvents: computed('model.[]', function() {
    return this.get('model').filter(event => {
      const callForPapers = event.get('speakersCall');
      if (!callForPapers || !callForPapers.get('startsAt')  || !callForPapers.get('endsAt')) {
        return false;
      }
      const startDateTime = callForPapers.get('startsAt');
      const endDateTime = callForPapers.get('endsAt');
      return moment().isBetween(startDateTime, endDateTime);
    });
  }),

  actions: {
    shareEvent(event) {
      this.set('eventToShare', event);
      this.set('isShareModalOpen', true);
    }
  }
});
