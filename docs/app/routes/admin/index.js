import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { hash } from 'rsvp';

@classic
export default class IndexRoute extends Route {
  async model() {
    const filterOptions = {
      name : 'id',
      op   : 'eq',
      val  : 1
    };
    return hash({
      events: this.store.queryRecord('admin-statistics-event', {
        filterOptions
      }),
      users: this.store.queryRecord('admin-statistics-user', {
        filterOptions
      }),
      mails: this.store.queryRecord('admin-statistics-mail', {
        filterOptions
      }),
      sessions: this.store.queryRecord('admin-statistics-session', {
        filterOptions
      }),
      groups: this.store.queryRecord('admin-statistics-group', {
        filterOptions
      })
    });
  }
}
