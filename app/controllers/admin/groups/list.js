import Controller from '@ember/controller';
// import { action } from '@ember/object';
import EmberTableControllerMixin from 'open-event-frontend/mixins/ember-table-controller';

export default class extends Controller.extend(EmberTableControllerMixin) {
  get columns() {
    return [
      {
        name          : this.l10n.t('Group Name'),
        valuePath     : 'name',
        cellComponent : 'ui-table/cell/admin/groups/cell-group-name'
      },
      {
        name      : this.l10n.t('Owner'),
        valuePath : 'user'
      },
      {
        name      : this.l10n.t('Number of Events'),
        valuePath : 'events'
      },
      {
        name      : this.l10n.t('Created'),
        valuePath : 'createdAt'
      }
    ];
  }
}
