import Controller from '@ember/controller';
import { action } from '@ember/object';
import EmberTableControllerMixin from 'open-event-frontend/mixins/ember-table-controller';
import { inject as service } from '@ember/service';

export default class extends Controller.extend(EmberTableControllerMixin) {

  @service errorHandler;

  get columns() {
    return [
      {
        name            : this.l10n.t('Group Name'),
        valuePath       : 'name',
        extraValuePaths : ['id', 'deletedAt'],
        width           : 120,
        isSortable      : true,
        headerComponent : 'tables/headers/sort',
        cellComponent   : 'ui-table/cell/admin/groups/cell-group-name',
        actions         : {
          deleteGroup  : this.deleteGroup.bind(this),
          restoreGroup : this.restoreGroup.bind(this)
        }
      },
      {
        name            : this.l10n.t('Owner'),
        valuePath       : 'user.email',
        isSortable      : true,
        headerComponent : 'tables/headers/sort'
      },
      {
        name      : this.l10n.t('Number of Events'),
        valuePath : 'events.length'
      },
      {
        name      : this.l10n.t('Number of Followers'),
        valuePath : 'followers.length'
      },
      {
        name            : this.l10n.t('Created At'),
        valuePath       : 'createdAt',
        cellComponent   : 'ui-table/cell/cell-simple-date',
        isSortable      : true,
        headerComponent : 'tables/headers/sort'
      },
      {
        name          : this.l10n.t('Public URL'),
        valuePath     : 'url',
        cellComponent : 'ui-table/cell/cell-link'
      }
    ];
  }

  @action
  async restoreGroup(group_id) {
    this.set('isLoading', true);
    try {
      const group =  this.store.peekRecord('group', group_id, { backgroundReload: false });
      group.set('deletedAt', null);
      group.save({ adapterOptions: { getTrashed: true } });
      this.notify.success(this.l10n.t('Group has been restored successfully.'),
        {
          id: 'group_restored'
        });
    } catch (e) {
      console.error('Error while restoring event', e);
      this.notify.error(this.l10n.t('An unexpected error has occurred.'),
        {
          id: 'restore_error'
        });
    }
    this.set('isLoading', false);
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
      this.errorHandler.handle(e);
    }
  }

}
