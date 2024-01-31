import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { hasExhibitors } from 'open-event-frontend/utils/event';

@classic
export default class ExhibitionRoute extends Route {
  queryParams = {
    search: {
      refreshModel: true
    }
  }

  titleToken() {
    return this.l10n.t('Exhibition');
  }

  async beforeModel() {
    const eventDetails = this.modelFor('public');
    if (!(await hasExhibitors(this.loader, eventDetails))) {
      this.transitionTo('not-found');
    }
  }

  async model(params) {
    const eventDetails = this.modelFor('public');
    const filterOptions = [
      {
        name : 'status',
        op   : 'eq',
        val  : 'accepted'
      }
    ];

    if (params.search) {
      filterOptions.push({
        or: [
          {
            name : 'name',
            op   : 'ilike',
            val  : `%${params.search}%`
          }
        ]
      });
    }

    return {
      event      : eventDetails,
      exhibitors : await this.infinity.model('exhibitors', {
        filter        : filterOptions,
        sort          : 'position',
        perPage       : 9,
        startingPage  : 1,
        perPageParam  : 'page[size]',
        pageParam     : 'page[number]',
        store         : eventDetails,
        infinityCache : 36000
      })
    };
  }
}
