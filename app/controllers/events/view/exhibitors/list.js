import Controller from '@ember/controller';
import EmberTableControllerMixin from 'open-event-frontend/mixins/ember-table-controller';

export default class ExhibitorsListController extends Controller.extend(EmberTableControllerMixin) {
  get columns() {
    return [
      {
        name      : this.l10n.t('Name'),
        valuePath : 'name'
      },
      {
        name      : this.l10n.t('Description'),
        valuePath : 'description'
      },
      {
        name      : this.l10n.t('URL'),
        valuePath : 'url'
      }
    ];
  }
}
