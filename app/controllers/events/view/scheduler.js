import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  header: {
    left   : 'today prev,next',
    center : 'title',
    right  : 'timelineDay,timelineThreeDays,agendaWeek,month'
  },
  views: {
    timelineThreeDays: {
      type     : 'timeline',
      duration : { days: 3 }
    }
  },
  actions: {
    drop() {
    },
    eventReceive(event) {
      event.preventDefault();
    },
    eventDrop(event) {
      event.preventDefault();
    }
    // All these callbacks work with jquery UI (get triggered), will be handled later.
  }
});
