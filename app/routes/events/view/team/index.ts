import Route from '@ember/routing/route';

export default class EventsViewTeamIndex extends Route.extend({
  // anything which *must* be merged to prototype here
}) {
  model(): unknown {
    return this.modelFor('events.view');
  }
}
