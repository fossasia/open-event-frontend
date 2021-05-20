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
  queryParams = {
    search: {
      refreshModel: true
    }
  }

  titleToken() {
    return this.l10n.t('Speakers');
  }

  async model(params) {
    const eventDetails = this.modelFor('public');
    const filterOptions = [...SPEAKERS_FILTER];

    if (params.search) {
      filterOptions.push({
        or: [
          {
            name : 'name',
            op   : 'ilike',
            val  : `%${params.search}%`
          },
          {
            name : 'organisation',
            op   : 'ilike',
            val  : `%${params.search}%`
          },
          {
            name : 'position',
            op   : 'ilike',
            val  : `%${params.search}%`
          }
        ]
      });
    }
    return {
      event    : eventDetails,
      speakers : await this.infinity.model('speakers', {
        filter       : filterOptions,
        perPage      : 9,
        startingPage : 1,
        perPageParam : 'page[size]',
        pageParam    : 'page[number]',
        store        : eventDetails,
        include      : 'sessions.track',
        sort         : 'order',
        public       : true
      })
    };
  }
}
