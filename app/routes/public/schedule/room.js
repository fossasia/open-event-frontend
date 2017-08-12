import Ember from 'ember';

const { Route, RSVP } = Ember;
export default Route.extend({
  titleToken() {
    return this.l10n.t('Rooms View');
  },
  model() {
    return RSVP.hash({
      event : this.modelFor('public'),
      rooms : [
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
