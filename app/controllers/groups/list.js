import Controller from '@ember/controller';
import EmberTableControllerMixin from 'open-event-frontend/mixins/ember-table-controller';

export default class extends Controller.extend(EmberTableControllerMixin) {
  per_page = 25;

  get columns() {
    return [
      {
        name      : this.l10n.t('Name'),
        valuePath : 'name'
      }
    ];
  }
}
