import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class extends Controller {

  @service errorHandler;

  groupName ='';

  groupEvents = [];

  @action
  addEvent(event) {
    if(!this.groupEvents.includes(event)){
      this.groupEvents.push(event);
    }
  }

  @action
  shareEvent() {}

  @action
  async submit() {
    try {
      this.loading = true;
      const myGroup = this.store.createRecord('group', {
        user   : this.authManager.currentUser,
        name   : this.groupName,
        events : this.groupEvents
      });
      await myGroup.save();
      this.notify.success(this.l10n.t('Your group has been saved'),
        {
          id: 'group_save'
        });
      this.router.transitionTo('groups.list');
    } catch (e) {
      console.error('Error while saving group', e);
      this.errorHandler.handle(e);
    } finally {
      this.loading = false;
      this.set('groupName', '');
      this.set('groupEvents', []);
    }
  }
}

