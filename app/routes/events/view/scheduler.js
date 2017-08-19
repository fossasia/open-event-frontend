import Ember from 'ember';

const { Route, RSVP } = Ember;

export default Route.extend({
  titleToken() {
    return this.l10n.t('Scheduler');
  },
  model() {
    return RSVP.hash({
      events: [{
        title      : 'Session 1',
        start      : '2017-07-26T07:08:08',
        end        : '2017-07-26T09:08:08',
        resourceId : 'a'
      }, {
        title      : 'Session 2',
        start      : '2017-05-26T07:08:08',
        end        : '2017-07-26T09:08:08',
        resourceId : 'b'
      }, {
        title      : 'Session 3',
        start      : '2017-07-26T07:08:08',
        end        : '2017-07-26T09:48:08',
        resourceId : 'c'
      }, {
        title      : 'Session 4',
        start      : '2017-07-26T07:15:08',
        end        : '2017-07-26T09:08:08',
        resourceId : 'd'
      }],
      rooms: [
        { id: 'a', title: 'Auditorium A' },
        { id: 'b', title: 'Auditorium B', eventColor: 'green' },
        { id: 'c', title: 'Auditorium C', eventColor: 'orange' },
        { id       : 'd', title    : 'Auditorium D', children : [
          { id: 'd1', title: 'Room D1' },
          { id: 'd2', title: 'Room D2' }
        ] },
        { id: 'e', title: 'Auditorium E' },
        { id: 'f', title: 'Auditorium F', eventColor: 'red' },
        { id: 'g', title: 'Auditorium G' },
        { id: 'h', title: 'Auditorium H' },
        { id: 'y', title: 'Auditorium Y' },
        { id: 'z', title: 'Auditorium Z' }
      ]
    });
  }
});
