import Ember from 'ember';

const { Route, RSVP } = Ember;

export default Route.extend({

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
        { id: 'a', title: 'Room A', eventColor: 'red' },
        { id: 'b', title: 'Room B', eventColor: 'blue' },
        { id: 'c', title: 'Room C' },
        { id: 'd', title: 'Room D', eventColor: 'green' }
      ]
    });
  }
});
