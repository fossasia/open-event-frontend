import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class extends Controller {

  @service errorHandler;

  groupEvents = [];

  @action
  addNewEvent(event) {
    if (!this.groupEvents.includes(event)) {
      this.groupEvents.push(event);
    }
  }

  @action
  async removeEvent(event) {
    alert('I am the alpha');
    this.model.group.events.filter(x => x !== event);
    await this.model.group.save();
  }

  @action
  shareEvent() {}

  @action
  async submit() {
    try {
      this.loading = true;
      this.model.group.set('events', this.groupEvents.concat(this.model.group.events.toArray()));
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
      this.set('groupEvents', []);
    }
  }
}

