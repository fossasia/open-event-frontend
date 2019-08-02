import Route from '@ember/routing/route';

export default class extends Route {
  async model(params) {
    let filterOptions = [
      {
        name : 'identifier',
        op   : 'eq',
        val  : params.invoice_identifier
      }
    ];
    return {
      'user' : await this.authManager.currentUser,
      'data' : await this.store.query('event-invoice', {
        include : 'event',
        filter  : filterOptions
      })
    };
  }

}
