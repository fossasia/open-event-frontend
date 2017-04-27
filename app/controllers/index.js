import Ember from 'ember';
import moment from 'moment';

const { Controller, computed } = Ember;

export default Controller.extend({

  callForSpeakersEvents: computed('model.[]', function() {
    return this.get('model').filter(event => {
      const callForPapers = event.get('callForPapers');
      if (callForPapers === null) {
        return false;
      }
      const startDateTime = moment.tz(callForPapers.startDate, callForPapers.timezone);
      const endDateTime = moment.tz(callForPapers.endDate, callForPapers.timezone);
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
