import Route from '@ember/routing/route';

export default Route.extend({
  async model() {
    const eventDetails = this.modelFor('public');
    return {
      event    : eventDetails,
      speakers : await eventDetails.query('speakers', {
        filter: [
          {
            name : 'sessions',
            op   : 'any',
            val  : {
              name : 'state',
              op   : 'eq',
              val  : 'accepted'
            }
          }
        ]
      })

    };
  }
});
