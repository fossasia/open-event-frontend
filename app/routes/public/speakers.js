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
    return this.infinity.model('speakers', {
      filter       : filterOptions,
      perPage      : 12,
      startingPage : 1,
      perPageParam : 'page[size]',
      pageParam    : 'page[number]',
      store        : eventDetails
    });


  }
});
