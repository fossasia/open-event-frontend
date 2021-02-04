import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

export const SPEAKERS_FILTER = [
  {
    name : 'sessions',
    op   : 'any',
    val  : {
      and: [
        {
          name : 'deleted-at',
          op   : 'eq',
          val  : null
        },
        {
          or: [{
            name : 'state',
            op   : 'eq',
            val  : 'accepted'
          }, {
            name : 'state',
            op   : 'eq',
            val  : 'confirmed'
          }]
        }
      ]
    }
  }
];

@classic
export default class SpeakersRoute extends Route {
  async model() {
    const eventDetails = this.modelFor('public');
    return {
      event    : eventDetails,
      speakers : await this.infinity.model('speakers', {
        filter        : SPEAKERS_FILTER,
        perPage       : 9,
        startingPage  : 1,
        perPageParam  : 'page[size]',
        pageParam     : 'page[number]',
        store         : eventDetails,
        include       : 'sessions.track',
        sort          : 'order',
        cache         : true,
        public        : true,
        infinityCache : 36000
      })
    };


  }
}
