import Route from '@ember/routing/route';

export default class EventsViewTeam extends Route.extend({
  // anything which *must* be merged to prototype here
}) {
  titleToken(): string {
    return this.l10n.t('Team');
  }
}
