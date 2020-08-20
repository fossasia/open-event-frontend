import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class SpeakersRoute extends Route {
  async model() {
    const eventDetails = this.modelFor('public');
    const filterOptions = [
      {
        and: [
          {
            name : 'sessions',
            op   : 'any',
            val  : {
              name : 'deleted-at',
              op   : 'eq',
              val  : null
            }
          },
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
        ]
      }
    ];
    return this.infinity.model('speakers', {
      filter       : filterOptions,
      perPage      : 12,
      startingPage : 1,
      perPageParam : 'page[size]',
      pageParam    : 'page[number]',
      store        : eventDetails,
      include      : 'sessions.track'
    });


  }
}
