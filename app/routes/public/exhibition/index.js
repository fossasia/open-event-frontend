import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { hasExhibitors } from 'open-event-frontend/utils/event';

@classic
export default class ExhibitionRoute extends Route {
  async beforeModel() {
    const eventDetails = this.modelFor('public');
    if (!(await hasExhibitors(this.loader, eventDetails))) {
      this.transitionTo('not-found');
    }
  }

  async model() {
    const eventDetails = this.modelFor('public');
    const filterOptions = [
      {
        name : 'status',
        op   : 'eq',
        val  : 'accepted'
      }
    ];
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
