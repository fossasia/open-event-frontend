import Ember from 'ember';
import moment from 'moment';

const { Controller, computed } = Ember;

export default Controller.extend({

  callForSpeakersEvents: computed('model.[]', function() {
    return this.get('model').filter(event => {
      const callForPapers = event.get('callForPapers');
      if (callForPapers === null || !callForPapers.get('startDate') || !callForPapers.get('timezone') || !callForPapers.get('endDate')) {
        return false;
      }
      const startDateTime = moment.tz(callForPapers.get('startDate'), callForPapers.get('timezone'));
      const endDateTime = moment.tz(callForPapers.get('endDate'), callForPapers.get('timezone'));
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
