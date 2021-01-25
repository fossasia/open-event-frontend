import Controller from '@ember/controller';
import { action } from '@ember/object';


export default class extends Controller {

  @action
  async deleteGroup(group_id) {
    try {
      const group = this.store.peekRecord('group', group_id, { backgroundReload: false });
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
