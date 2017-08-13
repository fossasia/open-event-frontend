import Ember from 'ember';

const { Route, RSVP } = Ember;

export default Route.extend({
  model() {
    return RSVP.hash({
      events: this.get('store').queryRecord('admin-statistics-event', {
        filter: {
          name : 'id',
          op   : 'eq',
          val  : 1
        }
      }),
      users: this.get('store').queryRecord('admin-statistics-user', {
        filter: {
          name : 'id',
          op   : 'eq',
          val  : 1
        }
      }),
      mails: this.get('store').queryRecord('admin-statistics-mail', {
        filter: {
          name : 'id',
          op   : 'eq',
          val  : 1
        }
      }),
      sessions: this.get('store').queryRecord('admin-statistics-session', {
        filter: {
          name : 'id',
          op   : 'eq',
          val  : 1
        }
      })
    });
  }
});
