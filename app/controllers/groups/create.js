import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class extends Controller {

  @service errorHandler;

  GroupName ='';

  @action
  async submit() {
    try {
      this.loading = true;
      const myGroup = this.store.createRecord('group', {
        user : this.authManager.currentUser,
        name : this.GroupName
      });
      await myGroup.save();
      this.notify.success(this.l10n.t('Your group has been saved'),
        {
          id: 'group_save'
        });
      this.router.transitionTo('groups.list');
    } catch (e) {
      console.error('Error while saving group', e);
      const message = e.errors?.[0]?.detail ?? this.l10n.t('Oops something went wrong. Please try again');
      this.notify.error(message,
        {
          id: 'group_save_error'
        });
    } finally {
      this.loading = false;
      this.set('GroupName', '');
    }
  }
}

