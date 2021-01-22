import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class extends Controller {

  @service errorHandler;

  groupName ='';

  groupEvents = [];

  @action
  addEvent(event) {
    this.groupEvents.push(event);
  }

  @action
  addNewEvent(event) {
    this.model.group.events.push(event);
  }

  @action
  removeEvent() {
    (this.model.group.events).toArray().pop();
  }

  @action
  shareEvent() {}

  @action
  async submit() {
    try {
      this.loading = true;
      await this.model.group.save();
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

