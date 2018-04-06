import Route from '@ember/routing/route';

export default Route.extend({
  async model() {
    return {
      events: await this.get('store').queryRecord('admin-statistics-event', {
        filter: {
          name : 'id',
          op   : 'eq',
          val  : 1
        }
      }),
      users: await this.get('store').queryRecord('admin-statistics-user', {
        filter: {
          name : 'id',
          op   : 'eq',
          val  : 1
        }
      }),
      mails: await this.get('store').queryRecord('admin-statistics-mail', {
        filter: {
          name : 'id',
          op   : 'eq',
          val  : 1
        }
      }),
      sessions: await this.get('store').queryRecord('admin-statistics-session', {
        filter: {
          name : 'id',
          op   : 'eq',
          val  : 1
        }
      })
    };
  }
});
