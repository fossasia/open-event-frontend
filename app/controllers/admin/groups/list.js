import Controller from '@ember/controller';
import { action } from '@ember/object';
import EmberTableControllerMixin from 'open-event-frontend/mixins/ember-table-controller';

export default class extends Controller.extend(EmberTableControllerMixin) {
  get columns() {
    return [
      {
        name            : this.l10n.t('Group Name'),
        valuePath       : 'name',
        extraValuePaths : ['id'],
        width           : 155,
        cellComponent   : 'ui-table/cell/admin/groups/cell-group-name',
        actions         : {
          deleteGroup        : this.deleteGroup.bind(this)
        }
      },
      {
        name          : this.l10n.t('Owner'),
        valuePath     : 'user',
        cellComponent : 'ui-table/cell/admin/groups/cell-group-owner'
      },
      {
        name          : this.l10n.t('Number of Events'),
        valuePath     : 'events',
        cellComponent : 'ui-table/cell/admin/groups/cell-group-events'
      },
      {
        name            : this.l10n.t('Created At'),
        valuePath       : 'createdAt',
        cellComponent   : 'ui-table/cell/admin/groups/cell-group-created'
      },
      {
        name          : this.l10n.t('Public URL'),
        valuePath     : 'events',
        cellComponent : 'ui-table/cell/admin/groups/cell-public-url'
      }
    ];
  }

  @action
  async deleteGroup(groupId) {
    try {
      const group = this.store.peekRecord('group', groupId, { backgroundReload: false });
      await group.destroyRecord();
      this.notify.success(this.l10n.t('Group has been deleted successfully.'),
        {
          id: 'grp_del_succ'
        });
      this.send('refreshRoute');
    } catch (e) {
      console.error('Error while deleting event', e);
      this.notify.error(this.l10n.t('An unexpected error has occurred.'),
        {
          id: 'grp_del_unex'
        });
    }
  }

}
