import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default class ExhibitorsReorderRoute extends Route {
  titleToken() {
    return this.l10n.t('Reorder Exhibitors');
  }

  model() {
    const event = this.modelFor('events.view');
    const exhibitors = event.query('exhibitors', {
      sort         : 'position',
      'page[size]' : 0,
      public       : true
    });
    return hash({
      event,
      exhibitors
    });
  }
}
