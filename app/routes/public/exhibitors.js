import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class ExhibitorsRoute extends Route {
  async model() {
    const eventDetails = this.modelFor('public');
    return {
      event      : eventDetails,
      exhibitors : await this.infinity.model('exhibitors', {
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
