import Component from '@ember/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class GroupForm extends Component {

  @service errorHandler;

  @action
  addEvent(event) {
    this.data.group.events.pushObject(event);
  }

  @action
  removeEvent(event) {
    this.data.group.events.removeObject(event);
  }

  @action
  shareEvent() {}

  @action
  submit(event) {
    event.preventDefault();
    try {
      this.loading = true;
      this.data.group.save();
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
    }
  }
}

