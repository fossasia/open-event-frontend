import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class LocationsRoute extends Route {
  titleToken() {
    return this.l10n.t('Location');
  }

  model() {
    return this.store.findAll('admin-sales-by-location');
  }
}
