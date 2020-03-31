import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class IndexRoute extends Route {
  async model() {
    return {
      events: await this.store.queryRecord('admin-statistics-event', {
        filter: {
          name : 'id',
          op   : 'eq',
          val  : 1
        }
      }),
      users: await this.store.queryRecord('admin-statistics-user', {
        filter: {
          name : 'id',
          op   : 'eq',
          val  : 1
        }
      }),
      mails: await this.store.queryRecord('admin-statistics-mail', {
        filter: {
          name : 'id',
          op   : 'eq',
          val  : 1
        }
      }),
      sessions: await this.store.queryRecord('admin-statistics-session', {
        filter: {
          name : 'id',
          op   : 'eq',
          val  : 1
        }
      })
    };
  }
}
