import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class OrganizersRoute extends Route {
  titleToken() {
    return this.l10n.t('Organizer');
  }

  model() {
    return this.store.findAll('admin-sales-by-organizer');
  }
}
