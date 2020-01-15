import Route from '@ember/routing/route';

export default Route.extend({
  async model() {
    const eventDetails = this.modelFor('public');
    const filterOptions = [
      {
        or: [
          {
            name : 'sessions',
            op   : 'any',
            val  : {
              name : 'state',
              op   : 'eq',
              val  : 'accepted'
            }
          },
          {
            name : 'sessions',
            op   : 'any',
            val  : {
              name : 'state',
              op   : 'eq',
              val  : 'confirmed'
            }
          }
        ]
      }
    ];
    return {
      event    : eventDetails,
      speakers : await eventDetails.query('speakers', {
        'page[size]' : 0,
        filter       : filterOptions,
        include      : 'sessions'
      })

    };
  }
});
